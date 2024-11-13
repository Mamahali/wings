require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'stock',
});

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.setHeader('Content-Type','application/json');
  res.status(500).json({ message: 'Internal server error' });
});

// Route to get all products
app.get('/api/product', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM product');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    next(err);
  }
});

// Route to create a new product
app.post('/api/product', async (req, res, next) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price === undefined || quantity === undefined) {
    return res.status(400).json({ message: 'All fields (name, category, price, quantity) are required' });
  }

  try {
    const query = `INSERT INTO product(name, category, price, quantity) VALUES (?, ?, ?, ?)`;
    await db.query(query, [name, category, price, quantity]);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error('Error adding product:', err);
    next(err);
  }
});

// POST a new product
app.post('/api/product', (req, res) => {
  const { name, category, price, quantity } = req.body;
  if (!name || !category) {
      return res.status(400).json({ message: 'Name and category are required' });
  }
  products.push({ name, category, price, quantity });
  res.status(201).json({ message: 'Product added successfully' });
});

app.put('/api/products/:name/quantity', async (req, res, next) => {
  const { name } = req.params;
  const { changeType, quantityChange } = req.body;

  const changeAmount = parseInt(quantityChange, 10);
  if (isNaN(changeAmount) || changeAmount <= 0) {
    return res.status(400).json({ message: 'Invalid quantity change amount' });
  }

  try {
    // Find the product
    const [rows] = await db.query('SELECT * FROM product WHERE name = ?', [name]);
    const product = rows[0];
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update quantity based on changeType
    let newQuantity = product.quantity;
    if (changeType === 'add') {
      newQuantity += changeAmount;
    } else if (changeType === 'deduct') {
      newQuantity = Math.max(0, newQuantity - changeAmount);
    } else {
      return res.status(400).json({ message: 'Invalid change type' });
    }

    await db.query('UPDATE product SET quantity = ? WHERE name = ?', [newQuantity, name]);
    res.json({ message: 'Product quantity updated successfully', name, newQuantity });
  } catch (err) {
    console.error('Error updating product quantity:', err);
    next(err);
  }
});


// Route to delete a product by name
app.delete('/api/product/:name', async (req, res, next) => {
  const { name } = req.params;

  try {
    const query = `DELETE FROM product WHERE name = ?`;
    const [result] = await db.query(query, [name]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    next(err);
  }
});

// Logout route
app.post('/api/logout', (req, res) => {
  // Here you might clear any server-side sessions if applicable.
  res.status(200).json({ message: 'Logout successful' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
