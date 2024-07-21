import connectToDatabase from '../../../mongodb';
import User from '../../../models/User';
import mongoose from 'mongoose';

export async function PUT(request) {
    try {
        await connectToDatabase();

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        console.log('Received ID:', id);

        if (!id) {
            return new Response('User ID is required', { status: 400 });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Invalid ID format');
            return new Response('Invalid User ID format', { status: 400 });
        }

        const objectId = new mongoose.Types.ObjectId(id);

        console.log('Converted ObjectId:', objectId);

        const user = await User.findById(objectId);
        console.log('User found:', user);

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        user.isBanned = false;
        await user.save();

        return new Response('User UnBanned successfully', { status: 200 });
    } catch (error) {
        console.error('Error unbanning user:', error);
        return new Response('Error unbanning user', { status: 500 });
    }
}
