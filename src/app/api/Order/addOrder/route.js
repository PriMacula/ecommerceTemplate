import connectToDatabase from '../../../mongodb';
import Order from '../../../models/Order';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectToDatabase();

        // Destructure the incoming JSON body
        const {
            orderId,
            customerName,
            shippingAddress,
            status,
            products, // Array of product objects
            totalAmount
        } = await request.json();

        // Validate required fields
        if (!orderId || !customerName || !shippingAddress || !products || !totalAmount) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Create a new order using Mongoose model
        const order = await Order.create({
            orderId,
            customerName,
            shippingAddress,
            status,
            products,
            totalAmount
        });

        // Return a NextResponse with JSON payload
        return NextResponse.json({ message: "Order added successfully", order });
    } catch (error) {
        console.error('Error adding order:', error);

        // Return a plain object with status and body for error case
        return NextResponse.json({ message: "Failed to add order" }, { status: 500 });
    }
}
