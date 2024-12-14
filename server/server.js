const express = require('express');
const cors = require('cors');
const knex = require('knex');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db('users')
        .where({ username, password })
        .then((user) => {
            if (user.length > 0) {
                res.json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Database error' });
        });
});

// // Test database connection
// db.raw('SELECT 1')
//     .then(() => { 
//         console.log('Database connected successfully');
//     })
//     .catch((err) => { 
//         console.error('Database connection failed:', err);
//     });


// Start Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
