require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const jwt = require('jsonwebtoken'); // Added jwt module

const app = express();

// Middleware
app.use(cors());
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
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'InNuatThai',
    port: 5432
  },
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await db('account')
      .where({ acc_username: username })
      .first();

    if (!user) {
      return res.status(404).json({ message: 'Invalid username or password' });
    }

    // Since passwords are stored as plain text, directly compare them
    const isPasswordValid = password === user.acc_password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.acc_id,
        username: user.acc_username,
        role: user.acc_name
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response with token and user info
    res.json({
      message: 'Login successful',
      token,
      username: user.acc_username,
      role: user.acc_name,
      name: user.acc_name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new inventory item
app.post('/addinventory', authenticateToken, async (req, res) => {
  const { prodName, prodDesc, prodCategory, prodPrice, stock, dateAdded } = req.body;
  console.log(req.body);
  try {
    // Insert into PRODUCT table
    const [newProdId] = await db('product').insert({
      prod_name: prodName,
      prod_desc: prodDesc,
      prod_category: prodCategory,
      prod_price: prodPrice,
    }).returning('prod_id');

    // Insert into INVENTORY table
    const [newItemId] = await db('inventory').insert({
      prod_id: newProdId.prod_id, // Ensure the correct data type is passed
      inv_stock: stock,
      inv_dateadded: dateAdded,
    }).returning('inv_no');

    res.status(201).json({
      inventoryNo: newItemId,
      prodId: newProdId.prod_id, // Ensure the correct data type is passed
      prodName,
      prodDesc,
      prodCategory,
      prodPrice,
      stock,
      dateAdded
    });
  } catch (error) {
    console.error('Error adding inventory:', error);
    res.status(500).json({ message: 'Failed to add inventory' });
  }
});

// Fetch inventory data
app.get('/display-inventory', authenticateToken, async (req, res) => {
  try {
    const inventory = await db('inventory')
      .join('product', 'inventory.prod_id', 'product.prod_id')
      .select(
        'inventory.inv_no',
        'product.prod_name',
        'product.prod_desc',
        'product.prod_category',
        'product.prod_price',
        'inventory.inv_stock',
        'inventory.inv_dateadded'
      );
    console.log('Fetched inventory:', inventory); // Log the data
    res.json(inventory);
  } catch (error) {
    console.log('Error fetching inventory:', error);
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
});


// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});