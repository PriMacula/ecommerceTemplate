import connectToDatabase from '../../../mongodb';
import Order from '../../../models/Order';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectToDatabase();

        // Destructure the incoming JSON body
        const { orderId } = await request.json();

        // Validate required fields
        if (!orderId) {
            return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
        }

        // Find the order by ID and update the status to "Cancelled"
        const order = await Order.findOne({orderId : orderId});
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        order.status = "Cancelled";
        await order.save();

        // Return a NextResponse with JSON payload
        return NextResponse.json({ message: "Order canceled successfully", order });
    } catch (error) {
        console.error('Error canceling order:', error);

        // Return a plain object with status and body for error case
        return NextResponse.json({ message: "Failed to cancel order" }, { status: 500 });
    }
}
