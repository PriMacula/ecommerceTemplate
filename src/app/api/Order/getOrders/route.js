import connectToDatabase from '../../../mongodb';
import Order from '../../../models/Order';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectToDatabase();
        
        // Fetch all orders
        const orders = await Order.find();

        // Return the fetched orders as JSON
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);

        // Return a JSON response with an error message
        return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
    }
}
