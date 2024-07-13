import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'EcommerceSite',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Ensure errors are propagated if connection fails
    }
};

export { connect }; // Export the connect function
