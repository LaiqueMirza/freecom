import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usersSchema = new mongoose.Schema({
  userInfo: {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumberMain: {
      type: Number,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  tokens:[{
    token:{
      type:String,
    }
  }],
  userAddress: {
    addresses: [
      {
        addressLine1: String,
        addressLine2: String,
        city: String,
        pinCode: Number,
        phoneNumberAddress: Number,
      },
    ],
    selectedAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      pinCode: Number,
      phoneNumberAddress: Number,
    },
  },
  userCart: {
    countOfCart: Number,
    itemsInCart: [
      {
        productName: String,
        productImage: String,
        photos: [{ type: String }],
        description: String,
        size:  [{ type: String }],
        types:String,
        selectedSize: String,
        quantity: Number,
        price: Number,
        productIngredients: [{ type: String }],
        directionForUse: String,
        additionalInfo: String,
        date: Date
      
      },
    ],
  },
  userOrders: {
    noOfOrderedItems:Number,
    orderedItems:
    [{
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
    selectedSize:[{
        type: String,
        required: true
    }],
    price: [{
        type: Number,
        required: true
    }],
    quantity:  [{
        type: Number,
        required: true
    }],
    onlinePayment:Boolean,
    paymentStatus:String,
    totalAmount:Number,
    userPhoneNumber: Number,
    userName:String,
    userId: String,
    deliveryAddress: {
        type: Map,
        of: String
      },
    orderDate: {
        type: Date,
        default: Date.now
    }
  }]
}
});

//generating access toke so that anyone can't make the request
usersSchema.methods.generateAuthToken= async function(){
  try{
    const token = jwt.sign({_id:this._id.toString()},
    process.env.SECRET_KEY
    );
    this.tokens= this.tokens.concat({token:token})
    await this.save();
    return token
  }catch(err){
    res.send("error is "+ err);
  }
}

//hashing the password from lai to beufurvfvf$...
// so that hacker can't see pasword
usersSchema.pre("save",async function(next){
    if(this.isModified('userInfo')){
      this.userInfo.password = await bcrypt.hash(this.userInfo.password, 10)
    }
  next();
})
const User = new mongoose.model("User", usersSchema);

export default User;
