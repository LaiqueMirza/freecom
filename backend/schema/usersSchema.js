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
        price:  [{ type: Number }],
        totalPrice: Number,
        productIngredients: [{ type: String }],
        directionForUse: String,
        additionalInfo: String,
        date: Date
      
      },
    ],
  },
  userOrders: [
    {type: String}
  ]
},
{ timestamps: true }
);

//generating access toke so that anyone can't make the request
usersSchema.methods.generateAuthToken= async function(){
  try{
    const token = jwt.sign({_id:this._id.toString()},
    process.env.SECRET_KEY
    );
    this.tokens= this.tokens.concat({token:token});
    console.log(this, "this is the user",token,"token");
    // await this.save();
    await User.updateOne(
      { _id: this._id },
      {
        $set: {
          tokens: [{token:token}]
        },
      }
    );
    return token
  }catch(err){
    // res.send("error is "+ err);
    console.log("error is "+ err);
  }
}

//hashing the password from lai to beufurvfvf$...
// so that hacker can't see pasword
usersSchema.pre("save",async function(next){
    if(this.isModified('userInfo')){
      console.log("hashing happenef");
      this.userInfo.password = await bcrypt.hash(this.userInfo.password, 10)
    }
  next();
})
const User = new mongoose.model("User", usersSchema);

export default User;
