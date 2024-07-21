// src/mongodb.js
import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'EcommerceSite',
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Ensure errors are propagated if connection fails
    }
};

export default connectToDatabase;
