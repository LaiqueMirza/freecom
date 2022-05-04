import mongoose from 'mongoose';

 const otpsSchema = new mongoose.Schema({
    email: String,
    code: String,
    expiresIn: Number
},
{ timestamps: true });

const Otp = new mongoose.model("Otp",otpsSchema);
export default Otp;