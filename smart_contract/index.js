
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
const conurl = "mongodb+srv://rohan:kankimagi@cluster0.ecwot4i.mongodb.net/blockchainintern?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(conurl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected")).catch((err) => console.log("Error, Not connected"));

// Define the schema for the database
const transactionSchema = new mongoose.Schema({
  address: String,
  amount: Number,
  message: String
});

// Create a model for the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

// Initialize the Express app
const app = express();
app.use(bodyParser.json());

// Create a POST API to add a new transaction
app.post('/transaction', async (req, res) => {
  const { address, amount, message } = req.body;
  const newTransaction = new Transaction({ address, amount, message });
  await newTransaction.save();
  res.status(201).send(newTransaction);
});

// Create a GET API to fetch all transactions
app.get('/transactions', async (req, res) => {
  const transactions = await Transaction.find({});
  res.send(transactions);
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
