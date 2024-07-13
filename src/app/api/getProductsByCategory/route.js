// src/app/api/getProductsByCategory/route.js

import { connect } from '../../mongodb';
import Product from '../../models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await connect(); // Establish MongoDB connection

        const { category } = req.nextUrl.category;

        if (!category) {
            return NextResponse.json({ error: 'Category parameter is required.' }, { status: 400 });
        }

        const products = await Product.find({ category });
        return NextResponse.json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return  NextResponse.json({ error: 'Failed to fetch products'+error }, { status: 500 }) };
    }


