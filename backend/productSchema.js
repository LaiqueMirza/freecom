import mongoose from 'mongoose';

 const productsSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        default: null
    },
    photos: [{ type: String }],
    description: {
        type: String,
        default: null
    },
    size: [{ type: String }],
    selectedSize:String,
    quantity:Number,
    brand: String,
    price: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

const Product = new mongoose.model("Product", productsSchema);


export default Product

