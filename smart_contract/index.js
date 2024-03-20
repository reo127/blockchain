
const express = require('express'); 
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cors = require('cors');


// Connect to MongoDB
// const conurl = "mongodb+srv://admin:admin17455@cluster0.irewtx1.mongodb.net/blockchain?retryWrites=true&w=majority&appName=Cluster0"
const conurl = "mongodb+srv://rohan:kankimagi@cluster0.ecwot4i.mongodb.net/blockchainintern?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(conurl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected")).catch((err) => console.log("Error, Not connected"));

// Define the schema for the database
const transactionSchema = new mongoose.Schema({
  address: String,
  toAddress: String,
  amount: Number,
  message: String
});

// Create a model for the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

// Initialize the Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a POST API to add a new transaction
app.post('/transaction', async (req, res) => {
  const { address, toAddress, amount, message } = req.body;
  const newTransaction = new Transaction({ address, toAddress, amount, message });
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
