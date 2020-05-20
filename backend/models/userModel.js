const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        default: 'here-goes-avatar-image'
    },
    role: {
        type: String,
        enum: ['user', 'owner', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8, // Password must have at least 8 characters
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This will only work on .save() and .create()!!
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

// DOCUMENT MIDDLEWARES
userSchema.pre('save', async function(next) {
    // If password has not been modified, then return next
    if(!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    
    // Delete passwordConfirm field to not have it set plainly in the database
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function(next) {
    // This points to the current query
    this.find({ active: {$ne: false} });
    next();
});

// INSTANCE METHODS
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10); // base 10

        return JWTTimestamp < changedTimeStamp;
    } 

    // False means not changed
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log({resetToken}, this.passwordResetToken);
    
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;