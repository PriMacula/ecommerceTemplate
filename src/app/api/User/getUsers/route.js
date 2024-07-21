import connectToDatabase from '../../../mongodb';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDatabase();

        // Fetch all users from the database
        const users = await User.find({});

        // Return a NextResponse with JSON payload
        return NextResponse.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);

        // Return a plain object with status and body for error case
        return { status: 500, body: { message: "Failed to fetch users" } };
    }
}
