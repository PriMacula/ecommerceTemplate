import connectToDatabase from '../../../mongodb';
import Order from '../../../models/Order';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectToDatabase();
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId'); // Extract userId from query parameters

        if (!userId) {
            return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
        }

        // Fetch orders by userId
        const orders = await Order.find({ userId }); // Query by userId

        if (orders.length === 0) {
            return NextResponse.json({ message: "No orders found for this user" }, { status: 404 });
        }

        // Return the orders details
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);

        // Return error response
        return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
    }
}
