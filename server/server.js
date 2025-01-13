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

// log in condition
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
        userId: user.acc_id,  // Make sure userId is passed here
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
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new inventory item
app.post('/addinventory', authenticateToken, async (req, res) => {
  const { prodName, prodDesc, prodCategory, prodPrice, stock, dateAdded } = req.body;
  const acc_id = req.user?.userId; // Extract acc_id from the token

  if (!acc_id) {
    return res.status(400).json({ message: 'Account ID is required' });
  }

  try {
    // Insert into PRODUCT table
    const [newProdId] = await db('product')
      .insert({
        prod_name: prodName,
        prod_desc: prodDesc,
        prod_category: prodCategory,
        prod_price: prodPrice,
        acc_id, // Track who added the product
      })
      .returning('prod_id');

    // Insert into INVENTORY table
    const [newItemId] = await db('inventory')
      .insert({
        prod_id: newProdId.prod_id, // Link the product ID
        inv_stock: stock,
        inv_dateadded: dateAdded,
        acc_id, // Track who added the inventory
      })
      .returning('inv_no');

    res.status(201).json({
      inventoryNo: newItemId,
      prodId: newProdId.prod_id,
      prodName,
      prodDesc,
      prodCategory,
      prodPrice,
      stock,
      dateAdded,
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
        'product.prod_id',
        'product.prod_name',
        'product.prod_desc',
        'product.prod_category',
        'product.prod_price',
        'inventory.inv_stock',
        'inventory.inv_dateadded',

      );
    // console.log('Fetched inventory:', inventory); // Log the data
    res.json(inventory);
  } catch (error) {
    console.log('Error fetching inventory:', error);
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
});

// Update inventory item
app.put('/update-inventory', authenticateToken, async (req, res) => {
  const {
    inv_no,
    prod_id,
    prod_name,
    prod_desc,
    prod_category,
    prod_price,
    inv_stock,
    inv_dateadded,
  } = req.body;

  const acc_id = req.user?.userId; // Extract acc_id from the token

  if (!acc_id) {
    return res.status(400).json({ message: 'Account ID is required' });
  }

  if (!prod_id) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    await db.transaction(async (trx) => {
      // Update product table
      await trx('product')
        .where('prod_id', prod_id)
        .update({
          prod_name,
          prod_desc,
          prod_category,
          prod_price,
          acc_id, // Track who updated the product
        });

      // Update inventory table
      await trx('inventory')
        .where('inv_no', inv_no)
        .update({
          inv_stock,
          inv_dateadded,
          acc_id, // Track who updated the inventory
        });
    });
    res.status(200).json({ message: 'Inventory and Product updated successfully' });
  } catch (error) {
    console.error('Error updating inventory and product:', error);
    res.status(500).json({ error: 'Failed to update inventory and product' });
  }
});

// Delete inventory item
app.delete('/delete-inventory/:inv_no', authenticateToken, async (req, res) => {
  const { inv_no } = req.params;  // Get inv_no from URL params

  try {
    // Deleting from inventory should be handled by cascading delete, but we can explicitly handle it if needed
    await db('inventory').where({ inv_no }).del();

    // If you also want to delete the product itself, use:
    // await db('product').where({ inv_no }).del();

    res.status(200).json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res.status(500).json({ message: 'Failed to delete inventory item' });
  }
});

// branch add inventory
app.post('/addbranchinventory', authenticateToken, async (req, res) => {
  const { invName,
    invDesc,
    invCategory,
    invPrice,
    invStock,
    invDateAdded, } = req.body;
  console.log(req.body);
  const acc_id = req.user?.userId; // Correct reference to userId in the token

  if (!acc_id) {
    return res.status(400).json({ message: 'Account ID is required' });
  }

  try {
    // Insert into table
    const [newProdId] = await db('branch_inventory').insert({

      br_inv_name: invName,
      br_inv_desc: invDesc,
      br_inv_category: invCategory,
      br_inv_price: invPrice,
      br_inv_stock: invStock,
      br_inv_date: invDateAdded,
      acc_id,
    }).returning('br_inv_id');

    res.status(201).json({
      invId: newProdId.br_inv_id, // Ensure the correct data type is passed
      invDesc,
      invCategory,
      invPrice,
      invStock,
      invDateAdded,
    });
  } catch (error) {
    console.error('Error adding branch inventory:', error);
    res.status(500).json({ message: 'Failed to add branch inventory' });
  }
});

// branch display inventory
app.get('/display-branch-inventory', authenticateToken, async (req, res) => {
  try {
    const inventory = await db('branch_inventory').select('*');
    console.log('Fetched inventory:', inventory); // Log the data
    res.json(inventory);
  } catch (error) {
    console.log('Error fetching branch inventory:', error);
    res.status(500).json({ message: 'Failed to fetch branch inventory' });
  }
});

// branch update inventory
app.put("/update-branch-inventory", authenticateToken, async (req, res) => {
  const {
    br_inv_id,
    br_inv_name,
    br_inv_desc,
    br_inv_category,
    br_inv_price,
    br_inv_stock,
    br_inv_date,
  } = req.body;

  console.log("Received data:", req.body);

  const acc_id = req.user?.userId; // Extract acc_id from the token

  if (!br_inv_id) {
    return res.status(400).json({ error: "Inventory ID is required" });
  }

  try {
    // Update the inventory record, including the acc_id
    await db("branch_inventory")
      .where("br_inv_id", br_inv_id)
      .update({
        br_inv_name,
        br_inv_desc,
        br_inv_category,
        br_inv_price,
        br_inv_stock,
        br_inv_date,
        acc_id, // Reflect the user who edited the record
      });

    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (error) {
    console.error("Error updating branch inventory:", error);
    res.status(500).json({ error: "Failed to update inventory" });
  }
});

// branch delete inventory
app.delete('/delete-inventory/:br_inv_id', authenticateToken, async (req, res) => {
  const { br_inv_id } = req.params;  // Get inv_no from URL params

  try {
    // Deleting from inventory should be handled by cascading delete, but we can explicitly handle it if needed
    await db('branch_inventory').where({ br_inv_id }).del();

    res.status(200).json({ message: 'Branch Inventory item deleted successfully' });
  } catch (error) {
    console.error("Error deleting branch inventory:", error);
    res.status(500).json({ message: 'Failed to delete branch inventory item' });
  }
});

// Endpoint to upload DIF
app.post('/upload-dif', authenticateToken, upload.single('image'), async (req, res) => {
  const { originalname, buffer } = req.file;
  const { name, dateAdded } = req.body;
  const acc_id = req.user?.userId; // Correct reference to userId in the token

  if (!acc_id) {
    return res.status(400).json({ message: 'Account ID is required' });
  }


  try {
    const [newDIF] = await db('delivery_instruction_form')
      .insert({
        acc_id, // Include the acc_id
        dif_imagepath: buffer,
        dif_name: name || originalname,
        dif_dateadded: dateAdded,
      })
      .returning(['dif_id', 'dif_name', 'dif_dateadded']);

    res.status(201).json({
      message: 'Image uploaded successfully',
      document: newDIF,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

app.get('/dif/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  const imageId = parseInt(id, 10);
  if (isNaN(imageId)) {
    return res.status(400).json({ message: 'Invalid image ID' });
  }

  try {
    const image = await db('delivery_instruction_form')
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

// Endpoint to fetch DIF
app.get('/dif-forms', authenticateToken, async (req, res) => {
  try {
    const images = await db('delivery_instruction_form').select('dif_id', 'dif_name', 'dif_dateadded');
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

// Endpoint to upload WSRR
app.post('/upload-wsrr', authenticateToken, upload.single('image'), async (req, res) => {
  const { originalname, buffer } = req.file;
  const { name, dateAdded } = req.body;
  const acc_id = req.user?.userId; // Correct reference to userId in the token

  if (!acc_id) {
    return res.status(400).json({ message: 'Account ID is required' });
  }


  try {
    const [newWSRRId] = await db('warehouse_stock_receiving_report').insert({
      acc_id,
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
    console.log('Error uploading WSRR image:', error);
    res.status(500).json({ message: 'Failed to upload WSRR image' });
  }
});

// Endpoint to fetch WSRR
app.get('/wsrr-forms', authenticateToken, async (req, res) => {
  try {
    const images = await db('warehouse_stock_receiving_report').select('wsrr_id', 'wsrr_name', 'wsrr_dateadded');
    res.json(images);
  } catch (error) {
    console.log('Error fetching images:', error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

app.get('/wsrr/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  const imageId = parseInt(id, 10);
  if (isNaN(imageId)) {
    return res.status(400).json({ message: 'Invalid image ID' });
  }

  try {
    const image = await db('warehouse_stock_receiving_report')
      .where({ wsrr_id: imageId })
      .first();

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Set the content type and send the binary image data
    res.set('Content-Type', 'image/jpeg'); // Adjust based on your image format
    res.send(image.wsrr_imagepath);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ message: 'Failed to retrieve image' });
  }
});

// Endpoint to upload PO
app.post('/upload-po', authenticateToken, upload.single('image'), async (req, res) => {
  const { originalname, buffer } = req.file;
  const { name, dateAdded } = req.body;
  const acc_id = req.user?.userId; // Correct reference to userId in the token

  if (!acc_id) {
    return res.status(400).json({ message: 'Account ID is required' });
  }


  try {
    const [newPOId] = await db('purchase_order').insert({
      acc_id,
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
    console.log('Error uploading PO image:', error);
    res.status(500).json({ message: 'Failed to upload PO image' });
  }
});

// Endpoint to fetch PO
app.get('/po-forms', authenticateToken, async (req, res) => {
  try {
    const images = await db('purchase_order').select('po_id', 'po_name', 'po_dateadded');
    res.json(images);
  } catch (error) {
    console.log('Error fetching images:', error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

app.get('/po/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  const imageId = parseInt(id, 10);
  if (isNaN(imageId)) {
    return res.status(400).json({ message: 'Invalid image ID' });
  }

  try {
    const image = await db('purchase_order')
      .where({ po_id: imageId })
      .first();

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Set the content type and send the binary image data
    res.set('Content-Type', 'image/jpeg'); // Adjust based on your image format
    res.send(image.po_imagepath);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ message: 'Failed to retrieve image' });
  }
});

// add request
app.post('/add-request', authenticateToken, async (req, res) => {
  const { title, branch, requestDate, requesterName, dateNeed, products } = req.body;
  const acc_id = req.user?.userId;

  if (!acc_id) {
    return res.status(400).json({ message: 'Account ID is required' });
  }

  try {
    await db.transaction(async (trx) => {
      // Insert request form using Knex.js
      const [{ rf_id }] = await trx('request_form')
        .insert({
          rf_title: title,
          rf_branch: branch,
          rf_date: requestDate,
          rf_requestor_name: requesterName,
          rf_date_needed: dateNeed,
          acc_id: acc_id,
        })
        .returning('rf_id');

      // Check if products exist and have sufficient stock
      for (const product of products) {
        const stockRows = await trx('inventory')
          .select('prod_id', 'inv_stock')
          .where('prod_id', product.prod_id);

        if (stockRows.length === 0) {
          throw new Error(`Product with ID ${product.prod_id} not found`);
        }

        if (stockRows[0].inv_stock < product.quantity) {
          throw new Error(`Insufficient stock for product ID ${product.prod_id}`);
        }
      }

      // Insert products and update inventory stock using Knex.js
      for (const product of products) {
        await trx('request_product').insert({
          rf_id: rf_id,
          prod_id: product.prod_id,
          rp_quantity: product.quantity,
          rp_description: product.desc,
        });

        await trx('inventory')
          .where('prod_id', product.prod_id)
          .decrement('inv_stock', product.quantity);
      }
    });

    res.status(201).json({
      message: "Request created successfully",
      success: true
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Failed to create request",
      error: error.message
    });
  }
});

app.get('/display-request', authenticateToken, async (req, res) => {
  try {
    const request = await db('request_form')
      .select('*');
    res.json(request);
  } catch (error) {
    console.log('Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }

});

// request details 
app.get('/request-details/:rf_id', authenticateToken, async (req, res) => {
  const { rf_id } = req.params;
  console.log("Received request for:", req.params.rf_id);

  try {
    console.log("Fetching request for rf_id:", rf_id);

    // Fetch the request details
    const request = await db('request_form').where({ rf_id }).first();
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    console.log("Request Details:", request);

    // Fetch only the products for the given rf_id
    const products = await db('request_product')
      .join('product', 'request_product.prod_id', 'product.prod_id')
      .where('request_product.rf_id', rf_id) // Filter by rf_id
      .select(
        'request_product.rp_id',
        'product.prod_name',
        'request_product.rp_description',
        'request_product.rp_quantity'
      );

    console.log("Filtered Products for rf_id:", rf_id, products);

    // Send the response
    res.json({ request, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching request details' });
  }
});

// Middleware for role-based validation
const validateStatusUpdate = (userRole, status) => {
  const accountingStatuses = ["For Approval", "Pending", "Decline"];
  const adminStatuses = ["Approve", "Decline"];
  if (userRole === "accounting" && !accountingStatuses.includes(status)) return false;
  if (userRole === "admin" && !adminStatuses.includes(status)) return false;
  return true;
};

app.put("/update-request/:rf_id", async (req, res) => {
  const { rf_id } = req.params;
  const { comments, receivedBy, approvedBy, status, userRole } = req.body;

  console.log("Request Body:", req.body); // Log the incoming data

  try {
    // Validate role and status
    if (status && !validateStatusUpdate(userRole, status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status value '${status}' for role '${userRole}'.`,
      });
    }

    // Update the request in the database
    const result = await db("request_form")
      .where({ rf_id })
      .update({
        rf_comment: comments || null,
        rf_received_by: userRole === "accounting" ? receivedBy || null : undefined,
        rf_approved_by: userRole === "admin" ? approvedBy || null : undefined,
        rf_status: status || null,
      });

    if (result) {
      res.status(200).json({
        success: true,
        message: "Request details updated successfully!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the request",
    });
  }
});




// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});