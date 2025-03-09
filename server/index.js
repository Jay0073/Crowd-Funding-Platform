const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Campaign Schema
const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bankDetails: {
        accountHolder: String,
        accountNumber: String,
        bankName: String
    },
    documents: [String], // Array of document URLs
    createdAt: { type: Date, default: Date.now }
});

// Donation Schema
const donationSchema = new mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    donatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Campaign = mongoose.model('Campaign', campaignSchema);
const Donation = mongoose.model('Donation', donationSchema);

// Basic Routes
app.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/campaigns', async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        await campaign.save();
        res.status(201).json({ message: 'Campaign created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/donations', async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();
        
        // Update campaign raised amount
        await Campaign.findByIdAndUpdate(
            req.body.campaignId,
            { $inc: { raisedAmount: req.body.amount } }
        );
        
        res.status(201).json({ message: 'Donation successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
