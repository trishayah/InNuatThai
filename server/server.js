require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Added jwt module

const app = express();

// Middleware
app.use(cors({ origin: '*' }));

app.use(express.json());


// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
// Database Configuration
const db = knex({
    client: 'mysql2',
    connection: { 
      host: process.env.DB_HOST || 'localhost', // Database host
      user: process.env.DB_USER || 'root',     // Database username
      password: process.env.DB_PASSWORD || '12345', // Database password
      database: process.env.DB_NAME || 'db', // Database name
      port: process.env.DB_PORT || 3306        // Database port
    },
});
// async function hashExistingPasswords() {
//     try {
//       const users = await db('account').select('acc_id', 'acc_password');
  
//       for (const user of users) {
//         const hashedPassword = await bcrypt.hash(user.acc_password, 10);
//         await db('account')
//           .where({ acc_id: user.acc_id })
//           .update({ acc_password: hashedPassword });
//       }
  
//       console.log('Passwords hashed successfully!');
//     } catch (error) {
//       console.error('Error hashing passwords:', error);
//     } finally {
//       // db.destroy();
//     }
//   }
  
//   hashExistingPasswords();

// Login Endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Request body received:", req.body); // Debugging input

  try {
    if (!username || !password) {
      console.error("Missing username or password");
      return res.status(400).json({ message: "Username and password are required." });
    }

    const user = await db("account").where({ acc_username: username }).first();
    console.log("User fetched from database:", user); // Debugging user data

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "Invalid username or password." });
    }

    const isPasswordValid = password.trim() === user.acc_password.trim();
    if (!isPasswordValid) {
      console.error("Password mismatch");
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { userId: user.acc_id, username: user.acc_username, role: user.acc_name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      username: user.acc_username,
      role: user.acc_name,
      name: user.acc_name,
    });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find the user by username
//     const user = await db('account')
//       .where({ acc_username: username })
//       .first();

//     if (!user) {
//       return res.status(404).json({ message: 'Invalid username or password' });
//     }

//     // Since passwords are stored as plain text, directly compare them
//     const isPasswordValid = password === user.acc_password;

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         userId: user.acc_id,
//         username: user.acc_username,
//         role: user.acc_name
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     // Send response with token and user info
//     res.json({
//       message: 'Login successful',
//       token,
//       username: user.acc_username,
//       role: user.acc_name,
//       name: user.acc_name
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

//   app.post('/change-password', async (req, res) => {
//     const { userId, currentPassword, newPassword } = req.body;
  
//     try {
//       // Fetch the user by ID
//       const user = await db('account').where({ acc_id: userId }).first();
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Verify the current password
//       const isPasswordValid = await bcrypt.compare(currentPassword, user.acc_password);
  
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Current password is incorrect' });
//       }
  
//       // Hash the new password
//       const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
//       // Update the password in the database
//       await db('account').where({ acc_id: userId }).update({ acc_password: hashedNewPassword });
  
//       res.json({ message: 'Password changed successfully!' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  

// // Protected dashboard metrics endpoint
// app.get('/api/dashboard/metrics', authenticateToken, async (req, res) => {
//   try {
//     const metrics = await db
//       .select(
//         db.raw('COUNT(*) FILTER (WHERE status = \'pending\') as pendingRequests'),
//         db.raw('COUNT(*) FILTER (WHERE quantity <= reorder_point) as lowStockItems'),
//         db.raw('COUNT(*) as totalRequests'),
//         db.raw('COUNT(*) FILTER (WHERE status = \'received\') as receivedRequests')
//       )
//       .from('requests');

//     res.json(metrics[0]);
//   } catch (error) {
//     console.error('Error fetching metrics:', error);
//     res.status(500).json({ message: 'Error fetching dashboard metrics' });
//   }
// });

// Get user profile
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await db('account')
      .where({ acc_id: req.user.userId })
      .select('acc_name as firstname', 'acc_lastname as lastname', 'acc_username as username', 'acc_password as password')
      .first();
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile.' });
  }
});

// Update user profile
app.put('/profile', authenticateToken, async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  try {
    await db('account')
      .where({ acc_id: req.user.userId })
      .update({ acc_name: firstname, acc_lastname: lastname, acc_username: username, acc_password: password });
    res.json({ message: 'Profile updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile.' });
  }
});


// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
