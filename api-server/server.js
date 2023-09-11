const express = require('express');
const items = require('./data');
const app = express();
const PORT = 8000; // Choose your desired port

app.use(express.json());

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all items
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// Read a single item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    res.status(200).json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.status(200).json(deletedItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});