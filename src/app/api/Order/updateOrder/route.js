import connectToDatabase from '../../../mongodb';
import Order from '../../../models/Order';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectToDatabase();

        // Destructure the incoming JSON body
        const { orderId, status } = await request.json();

        // Validate required fields
        if (!orderId || !status) {
            return NextResponse.json({ message: "Order ID and status are required" }, { status: 400 });
        }

        // Find the order by ID and update the status
        const order = await Order.findOne({ orderId: orderId }).exec(); // Use findOneAndUpdate instead of findByIdAndUpdate if you want to support MongoDB 4.4+ orderId);
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        order.status = status;
        await order.save();

        // Return a NextResponse with JSON payload
        return NextResponse.json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error('Error updating order status:', error);

        // Return a plain object with status and body for error case
        return NextResponse.json({ message: "Failed to update order status" }, { status: 500 });
    }
}
