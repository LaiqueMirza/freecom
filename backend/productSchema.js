import mongoose from 'mongoose';

 const productsSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        default: null
    },
    photos: [{ type: String }],
    description: {
        type: String,
        default: null
    },
    size: [{ type: String }],
    types: { type: String },
    selectedSize:String,
    price: Number,
    quantity: Number,
    productIngredients: [{ type: String }],
    directionForUse:String,
    additionalInfo:String,
    date: {
        type: Date,
        default: Date.now
    }
})

const Product = new mongoose.model("Product", productsSchema);

export default Product;