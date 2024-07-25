import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    enum: ['email', 'google'], // Adjust according to your account types
    default: 'email',
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
