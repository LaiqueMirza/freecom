import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    productId: [{
        type: String,
        required: true
    }],
    productName: [{
        type: String,
        required: true
    }],
    orderStatus: {
        type: String,
        default: "PENDING"
    },
    selectedSize: [{
        type: String,
        required: true
    }],
    price: [{
        type: Number,
        required: true
    }],
    quantity: [{
        type: Number,
        required: true
    }],
    onlinePayment: Boolean,
    paymentStatus: String,
    totalAmount: Number,
    userPhoneNumber: Number,
    userName: String,
    userEmail: String,
    userId: String,
    deliveryAddress: {
        type: Map,
        of: String
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date,
        default: null
    }
},
    { timestamps: true }
)

const Order = new mongoose.model("Order", ordersSchema);
export default Order;