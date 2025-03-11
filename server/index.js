const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");
const { v4: uuidv4 } = require('uuid');
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
  userId: { type: String, unique: true, default: () => `USER-${uuidv4()}` },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Fundraise Schema
const FundraiseSchema = new mongoose.Schema({
  fundId: {type: String, unique: true, default: () => `USER-${uuidv4()}`},
  title: { type: String, required: true },
  name: {type: String, required: true},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  category: { type:String, required: true},
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  enddate: {type: Date, required: true},
  createdBy: { type: String, required: true, },
  
  accountHolderName: {type: String, required: true},
  bankName: {type: String, required: true},
  accountNumber: {type: String, required: true},
  upiNumber: {type: String, required: true},
  documents: [String], // Array of document URLs
  createdAt: { type: Date, default: Date.now },
});

// Donation Schema
const donationSchema = new mongoose.Schema({
  fundraiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Fundraise" },
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
        id: user.userId,
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
        id: user.userId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(colors.red(error));
    res.status(500).json({ error: error.message });
  }
});


// POST /fundraise - Create a new fundraiser
app.post("/fundraise", async (req, res) => {
  console.log("got in the fundraise function with data ", req.body)
  try {
    const {
      title,
      category,
      description,
      targetAmount,
      raisedAmount,
      enddate,
      accountHolderName,
      bankName,
      accountNumber,
      upiNumber,
      documents,
    } = req.body;

    // Get userId from the authenticated user
    // const user = await User.findById(req.user.userId); // Assuming req.user.userId is the userId of the authenticated user
    const id = "USER-c77383fc-5f2c-49b3-a705-5e4f4e6210de"
    const user = await User.findOne({userId: id});
    if (!user) {
      console.log(colors.red("User not found"))
      return res.status(404).json({ error: "User not found" });
    } 

    console.log(colors.blue("user found"))

    // Create the fundraiser
    const fundraiser = new Fundraise({
      fundId: `FUND-${uuidv4()}`,
      title,
      category,
      description,
      targetAmount,
      raisedAmount: raisedAmount || 0,
      enddate,
      createdBy: user.userId, // Store userId here
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      accountHolderName,
      bankName,
      accountNumber,
      upiNumber,
      documents,
    });

    await fundraiser.save();

    console.log(colors.green("Fund raising successful"))
    res.status(201).json({ message: "Fundraiser created successfully", fundraiser });
  } catch (error) {
    console.error("Error creating fundraiser:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
