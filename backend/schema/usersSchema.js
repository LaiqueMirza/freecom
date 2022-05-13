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
