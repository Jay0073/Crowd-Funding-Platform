const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const FundraiserSchema = new mongoose.Schema({
    id: {
        type: Int,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

FundraiserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Fundraiser = mongoose.model('Fundraiser', FundraiserSchema);
module.exports = Fundraiser;
