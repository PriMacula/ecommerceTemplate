import connectToDatabase from '../../../mongodb';
import Order from '../../../models/Order';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectToDatabase();
        const url = new URL(request.url);
        const orderId = url.searchParams.get('orderId'); // Extract orderId from query parameters

        if (!orderId) {
            return NextResponse.json({ message: "Missing order ID" }, { status: 400 });
        }

        // Fetch the order by orderId
        const order = await Order.findOne({ orderId }); // Query by orderId

        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        // Return the order details
        return NextResponse.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);

        // Return error response
        return NextResponse.json({ message: "Failed to fetch order" }, { status: 500 });
    }
}
