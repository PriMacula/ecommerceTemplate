import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Order schema
const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true, // Ensure that each order ID is unique
  },
  customerName: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], // Define possible status values
    default: 'Pending',
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to a Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the `updatedAt` field before saving
orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Order model
const Order =mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
