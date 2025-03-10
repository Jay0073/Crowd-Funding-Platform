const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(colors.green("MongoDB connected successfully")))
  .catch((err) => console.error(colors.red("MongoDB connection error:", err)));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Campaign Schema
const FundraiseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    bankName: String,
  },
  documents: [String], // Array of document URLs
  createdAt: { type: Date, default: Date.now },
});

// Donation Schema
const donationSchema = new mongoose.Schema({
  fundraiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  donatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Fundraise = mongoose.model("Fundraise", FundraiseSchema);
const Donation = mongoose.model("Donation", donationSchema);

// User registration with password hashing
app.post("/signup", async (req, res) => {
  console.log(colors.yellow("signing the user"));
  try {
    const { name, email, mobile, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error(colors.red(error));
    res.status(500).json({ error: error.message });
  }
});

// User login
app.post("/login", async (req, res) => {
  console.log(colors.yellow("logging the user"));
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(colors.red(error));
    res.status(500).json({ error: error.message });
  }
});

app.post("/fundraie", async (req, res) => {
  try {
    const fund = new Fundraise(req.body);
    await fund.save();
    res.status(201).json({ message: "Campaign created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/donations", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();

    // Update campaign raised amount
    await Campaign.findByIdAndUpdate(req.body.campaignId, {
      $inc: { raisedAmount: req.body.amount },
    });

    res.status(201).json({ message: "Donation successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(colors.yellow(`Server running on port ${PORT}`));
});
