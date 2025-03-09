// models/Fundraiser.js - Schema for fundraiser campaigns
const fundraiserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'Medical Emergency',
        'Education',
        'Natural Disaster',
        'Animal Welfare',
        'Community Development',
        'Others'
      ],
      message: '{VALUE} is not a supported category'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [50, 'Description must be at least 50 characters'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  targetAmount: {
    type: Number,
    required: [true, 'Target amount is required'],
    min: [1000, 'Target amount must be at least ₹1,000']
  },
  raisedAmount: {
    type: Number,
    default: 0
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'End date must be in the future'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'closed'],
    default: 'pending'
  },
  // Fundraiser Contact Details
  contactDetails: {
    fullName: {
      type: String,
      required: [true, 'Contact name is required']
    },
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please enter a valid email'
      }
    },
    phoneNumber: {
      type: String,
      required: [true, 'Contact phone number is required'],
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: 'Please enter a valid 10-digit phone number'
      }
    },
    address: {
      type: String,
      required: [true, 'Address is required']
    }
  },
  // Bank Account Details
  bankDetails: {
    accountName: {
      type: String,
      required: [true, 'Account holder name is required']
    },
    accountNumber: {
      type: String,
      required: [true, 'Account number is required'],
      validate: {
        validator: function(v) {
          return /^\d{9,18}$/.test(v);
        },
        message: 'Please enter a valid account number'
      }
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required']
    },
    upiId: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[\w\.\-_]{3,}@[a-zA-Z]{3,}$/.test(v);
        },
        message: 'Please enter a valid UPI ID'
      }
    }
  },
  // Document Storage
  documents: [{
    type: {
      type: String,
      required: true,
      enum: ['identity', 'medical', 'legal', 'other']
    },
    url: {
      type: String,
      required: true
    },
    name: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Campaign Statistics
  statistics: {
    totalDonors: {
      type: Number,
      default: 0
    },
    shareCount: {
      type: Number,
      default: 0
    },
    viewCount: {
      type: Number,
      default: 0
    }
  },
  // Donation History
  donations: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: Number,
    message: String,
    donatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update the updatedAt timestamp
fundraiserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for percentage of target reached
fundraiserSchema.virtual('percentageReached').get(function() {
  return (this.raisedAmount / this.targetAmount) * 100;
});

// Virtual for days remaining
fundraiserSchema.virtual('daysRemaining').get(function() {
  const now = new Date();
  const end = new Date(this.endDate);
  const diffTime = Math.abs(end - now);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Indexes for better query performance
fundraiserSchema.index({ userId: 1, status: 1 });
fundraiserSchema.index({ category: 1 });
fundraiserSchema.index({ createdAt: -1 });
fundraiserSchema.index({ 'contactDetails.email': 1 });

const Fundraiser = mongoose.model('Fundraiser', fundraiserSchema);

export default Fundraiser;
