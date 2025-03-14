const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
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
  endDate: {type: Date, required: true},
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
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
  donorName: {type: String, required: true},
  donorEmail: {type: String, required: true},
  amount: { type: Number, required: true },
  donatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Fundraise = mongoose.model("Fundraise", FundraiseSchema);
const Donation = mongoose.model("Donation", donationSchema);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Ensure 'uploads' directory exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded; // Add user payload to the request
    next();
  });
};

app.get("/fetchuser", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/profileInfo", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({error:"User not found"});
    }
    // =============================================================================in this api function, using the user.userId, get the =====================================
  } catch {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
})

app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.array("documents", 5), (req, res) => {
  try {
    const fileUrls = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
    res.json({
      success: 1,
      fileUrls,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: 0, message: "Image upload failed" });
  }
});

// User registration with password hashing
app.post("/signup", async (req, res) => {
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

    console.log(colors.green(user.name, " signed in successfully"))
  } catch (error) {
    console.error(colors.red(error));
    res.status(500).json({ error: error.message });
  }
});

// User login
app.post("/login", async (req, res) => {
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
    console.log(colors.green("user successfully logged in"));

  } catch (error) {
    console.error(colors.red(error));
    res.status(500).json({ error: error.message });
  }
});


// Fundraise Endpoint
app.post("/fundraise", authenticateToken, upload.array("documents", 5), async (req, res) => {
  try {
    const { documents } = req.body;

    // Extract data from form fields
    const {
      title,
      category,
      description,
      targetAmount,
      raisedAmount,
      endDate,
      accountHolderName,
      bankName,
      accountNumber,
      upiNumber,
    } = req.body;

    // Simulate getting the logged-in user (replace this with actual user logic)
    const id = "USER-c77383fc-5f2c-49b3-a705-5e4f4e6210de";
    const user = await User.findOne({ userId: id });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Create a new fundraiser
    const fundraiser = new Fundraise({
      fundId: `FUND-${uuidv4()}`,
      title,
      category,
      description,
      targetAmount,
      raisedAmount: raisedAmount || 0,
      endDate,
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
    res.status(201).json({
      message: "Fundraiser created successfully",
      fundraiser,
    });
  } catch (error) {
    console.error("Error creating fundraiser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/donations", authenticateToken, async (req, res) => {
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

// Get all fundraisers
app.get("/fetchfundraises", async (req, res) => {
  try {
    const fundraisers = await Fundraise.find({});
    res.status(200).json(fundraisers);
  } catch (error) {
    console.error("Error fetching fundraisers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get trending fundraisers
app.get("/fetchtrendingfundraises", async (req, res) => {
  try {
    const fundraisers = await Fundraise.find({}).sort({ createdAt: -1 }).limit(5);
    res.status(200).json(fundraisers);
  } catch (error) {
    console.error("Error fetching fundraisers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all fundraisers
app.get("/fetchfundraise/:fundId", async (req, res) => {
  const fundId = req.params;
  try {
    const fundraisers = await Fundraise.findOne({fundId: fundId.fundId})
    res.status(200).json(fundraisers);
  } catch (error) {
    console.error("Error fetching fundraisers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
    res.send("hello world")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(colors.yellow(`Server running on port ${PORT}`));
});

