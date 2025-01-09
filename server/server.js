require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const jwt = require('jsonwebtoken'); // Added jwt module
const multer = require('multer');
const path = require('path');

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

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    // console.log('Fetched inventory:', inventory); // Log the data
    res.json(inventory);
  } catch (error) {
    console.log('Error fetching inventory:', error);
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
});

// Endpoint to upload image
app.post('/upload-image', authenticateToken, upload.single('image'), async (req, res) => {
  const { originalname, buffer } = req.file;
  const { name, dateAdded } = req.body;

  try {
    const [newDIFId] = await db('dif').insert({
      dif_imagepath: buffer,
      dif_name: name || originalname,
      dif_dateadded: dateAdded,
    }).returning(['dif_id', 'dif_name', 'dif_dateadded']);

    res.status(201).json({
      message: 'Image uploaded successfully',
      document: {
        dif_id: newDIFId.dif_id,
        dif_name: newDIFId.dif_name,
        dif_dateadded: newDIFId.dif_dateadded,
      }
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

app.get('/image/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  const imageId = parseInt(id, 10);
  if (isNaN(imageId)) {
      return res.status(400).json({ message: 'Invalid image ID' });
  }

  try {
      const image = await db('dif')
          .where({ dif_id: imageId })
          .first();

      if (!image) {
          return res.status(404).json({ message: 'Image not found' });
      }

      // Set the content type and send the binary image data
      res.set('Content-Type', 'image/jpeg'); // Adjust based on your image format
      res.send(image.dif_imagepath);
  } catch (error) {
      console.error('Error retrieving image:', error);
      res.status(500).json({ message: 'Failed to retrieve image' });
  }
});

// Endpoint to fetch all images
app.get('/dif-forms', authenticateToken, async (req, res) => {
  try {
    const images = await db('dif').select('dif_id', 'dif_name', 'dif_dateadded');
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

// Endpoint to upload image to WSRR
app.post('/upload-wsrr-image', authenticateToken, upload.single('image'), async (req, res) => {
  const { originalname, buffer } = req.file;
  const { name, dateAdded } = req.body;

  try {
    const [newWSRRId] = await db('wsrr').insert({
      wsrr_imagepath: buffer,
      wsrr_name: name || originalname,
      wsrr_dateadded: dateAdded,
    }).returning(['wsrr_id', 'wsrr_name', 'wsrr_dateadded']);

    res.status(201).json({
      message: 'WSRR Image uploaded successfully',
      document: {
        wsrr_id: newWSRRId.wsrr_id,
        wsrr_name: newWSRRId.wsrr_name,
        wsrr_dateadded: newWSRRId.wsrr_dateadded,
      }
    });
  } catch (error) {
    console.error('Error uploading WSRR image:', error);
    res.status(500).json({ message: 'Failed to upload WSRR image' });
  }
});

// Endpoint to retrieve WSRR image by ID
app.get('/wsrr-image/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  const imageId = parseInt(id, 10);
  if (isNaN(imageId)) {
      return res.status(400).json({ message: 'Invalid image ID' });
  }

  try {
      const image = await db('wsrr')
          .where({ wsrr_id: imageId })
          .first();

      if (!image) {
          return res.status(404).json({ message: 'WSRR Image not found' });
      }

      // Set the content type and send the binary image data
      res.set('Content-Type', 'image/jpeg'); // Adjust based on your image format
      res.send(image.wsrr_imagepath);
  } catch (error) {
      console.error('Error retrieving WSRR image:', error);
      res.status(500).json({ message: 'Failed to retrieve WSRR image' });
  }
});
app.get('/dif-forms', authenticateToken, async (req, res) => {
  try {
    const images = await db('dif').select('dif_id', 'dif_name', 'dif_dateadded');
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});
// Endpoint to upload image to PO
app.post('/upload-po-image', authenticateToken, upload.single('image'), async (req, res) => {
  const { originalname, buffer } = req.file;
  const { name, dateAdded } = req.body;

  try {
    const [newPOId] = await db('po').insert({
      po_imagepath: buffer,
      po_name: name || originalname,
      po_dateadded: dateAdded,
    }).returning(['po_id', 'po_name', 'po_dateadded']);

    res.status(201).json({
      message: 'PO Image uploaded successfully',
      document: {
        po_id: newPOId.po_id,
        po_name: newPOId.po_name,
        po_dateadded: newPOId.po_dateadded,
      }
    });
  } catch (error) {
    console.error('Error uploading PO image:', error);
    res.status(500).json({ message: 'Failed to upload PO image' });
  }
});

// Endpoint to retrieve PO image by ID
app.get('/po-image/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  const imageId = parseInt(id, 10);
  if (isNaN(imageId)) {
      return res.status(400).json({ message: 'Invalid image ID' });
  }

  try {
      const image = await db('po')
          .where({ po_id: imageId })
          .first();

      if (!image) {
          return res.status(404).json({ message: 'PO Image not found' });
      }

      // Set the content type and send the binary image data
      res.set('Content-Type', 'image/jpeg'); // Adjust based on your image format
      res.send(image.po_imagepath);
  } catch (error) {
      console.error('Error retrieving PO image:', error);
      res.status(500).json({ message: 'Failed to retrieve PO image' });
  }
});

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});