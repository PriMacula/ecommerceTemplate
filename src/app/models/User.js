import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, 
  },
}, { _id: false }); 

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  googleId: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  salt: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
    trim: true,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  forgetPasswordCode: {
    type: String,
    default: '',
  },
  accountType: {
    type: String,
    enum: ['email', 'google'],
    default: 'email',
  },
  cart: {
    type: [CartItemSchema], 
    default: [],
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
