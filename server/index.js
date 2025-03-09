// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; // for logging HTTP requests
import colors from 'colors'; // for colorful console logs <sup data-citation="1" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://www.geeksforgeeks.org/how-to-connect-node-js-to-mongodb-atlas-using-mongoose/">1</a></sup>

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // HTTP request logger

// MongoDB Connection Configuration
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(colors.red(`Error: ${error.message}`));
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error(colors.red(`MongoDB connection error: ${err}`));
});

mongoose.connection.on('disconnected', () => {
  console.log(colors.yellow('MongoDB disconnected'));
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fundraiser API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(colors.red(err.stack));
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
});
