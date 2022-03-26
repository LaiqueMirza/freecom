import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Product from "./backend/schema/productSchema.js";
import User from "./backend/schema/usersSchema.js";
import Order from "./backend/schema/orderSchema.js";
import Otp from "./backend/schema/otpSchema.js";
import Razorpay from "razorpay";
import bcrypt from "bcryptjs";
import cors from "cors";
import shortid from "shortid";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import sendEmailOnOrderCreation from "./backend/controllers/sendEmail.js";
import sendOtpEmail from "./backend/controllers/sendOtpEmail.js";

dotenv.config({ path: 'config.env' });

const app = express();

app.use(cors());
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cookieParser())

const PORT = process.env.PORT || 5000;
const CONNECTION_URL ='mongodb+srv://amruttam:ShantanuAmruttam@cluster0.cv2yl.mongodb.net/amruttam?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then(() => app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
}))
.catch(err => {
  console.log(err,"error");
});

// heroku hosting step
// if(process.env.NODE_ENV === "production"){
//   app.use(express.static("app/build"));
// }

const auth = async (req,res,next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = Jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOne({_id:verifyUser._id});
    // const userTotalAmount = user.userCart.itemsInCart.map(item => item.price*item.quantity)
    let cartProducts = user.userCart.itemsInCart
    let bagTotal = 0;
    let totalAmount = 0;
    {
      cartProducts?.map((product) => (bagTotal = bagTotal + product.price*product.quantity));
    }
    totalAmount += bagTotal;
    let shippingCharge = 0;
    shippingCharge = bagTotal > 500 ? "FREE" : 30;
    if (typeof shippingCharge === "number") {
      totalAmount += shippingCharge;
    }

    req.totalAmount = totalAmount
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}


// PAYMENT ------------------------------------------------------------

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/verifyPayment", (req, res) => {
  const payment = req.body;

  const text = payment.razorpay_payment_id + "|" + payment.razorpay_payment_id;
  var signature = crypto
    .createHmac("sha256", "12345678")
    .update(text)
    .digest("hex");

  if (signature === payment.razorpay_signature) {
    // You can update payment details in your database here
    return res.status(201).send({ message: "Successful payment" });
  } else {
    return res.status(400).send({ message: "Payment verification failed" });
  }
});


// jwt must be provided
app.post("/razorpay",auth, async (req, res) => {
const totalAmount = req.totalAmount
  const payment_capture = 1;
  const amount = totalAmount*100;
  const currency = "INR";

  const options = {
    amount: amount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      key: process.env.RAZORPAY_KEY_ID
    });
    
  } catch (error) {
    res.json({ status: 500, error });

  }
});

//pagination of backend so we get only 50 data at a time
//model is the model of mongo db database here it is product

app.get("/api/products", async (req, res) => {
  try {
    const result = await Product.find();
    res.json({status: 200, result})

  } catch (err) {
    res.json({ status: 500, err });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const result = await Order.find();
    res.json({status: 200, result})

  } catch (err) {
    res.json({ status: 500, err });
  }
});

//searcnh result may be modified with mongo
app.get("/products/:product", async (req, res) => {
  try {
    const word = req.params.product;
    const mongoData = await Product.find();
    let resultedData = mongoData.filter((searchedValue) => {
      let nameOfProduct = searchedValue.productName.toLowerCase();
      return nameOfProduct.includes(word);
    });

    if (resultedData && resultedData.length) {
      res.send(resultedData);
    } else {
      res.send();
    }
  } catch (err) {
    // empty func
  }
});



app.post("/order", async (req, res) => {
  try {
    const userName= req.body.payload.userName;
    const userEmail= req.body.payload.userEmail;
    const productName= req.body.payload.productName; 
    const selectedSize= req.body.payload.selectedSize;
    const quantity= req.body.payload.quantity;
    const price= req.body.payload.price;
    const onlinePayment= req.body.payload.onlinePayment;
    const totalAmount= req.body.payload.totalAmount;
    const deliveryAddress= {
     addressLine1: req.body.payload.deliveryAddress.addressLine1,
      addressLine2: req.body.payload.deliveryAddress.addressLine2,
      city: req.body.payload.deliveryAddress.city, 
      pinCode: req.body.payload.deliveryAddress.pinCode,
      phoneNumberAddress: req.body.payload.deliveryAddress.phoneNumberAddress
     };
      const newOrder = new Order({
          userPhoneNumber: req.body.payload.userPhoneNumber,
          userName: req.body.payload.userName, 
          userEmail: req.body.payload.userEmail, 
          userId: req.body.payload.userId, 
          productId: req.body.payload.productId, 
          productName: req.body.payload.productName,  
          selectedSize: req.body.payload.selectedSize, 
          quantity: req.body.payload.quantity, 
          price: req.body.payload.price, 
          onlinePayment: req.body.payload.onlinePayment,
          paymentStatus: req.body.payload.paymentStatus,
          totalAmount: req.body.payload.totalAmount,
          deliveryAddress: {
          addressLine1: req.body.payload.deliveryAddress.addressLine1, 
            addressLine2: req.body.payload.deliveryAddress.addressLine2, 
            city: req.body.payload.deliveryAddress.city, 
            pinCode: req.body.payload.deliveryAddress.pinCode,
            phoneNumberAddress: req.body.payload.deliveryAddress.phoneNumberAddress
           }
      });
      const newOrderCreated = await newOrder.save();
      await sendEmailOnOrderCreation(userEmail,userName,productName,selectedSize,quantity,price,totalAmount,deliveryAddress,newOrderCreated._id,onlinePayment)
      res.status(201).send(newOrderCreated);
  } catch (err) {
    console.log("error in creating order",err);
    res.status(500).send("Could not create the order, Try again");
  }
});


app.post("/login", async (req, res) => {

  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ "userInfo.email": email });
    const isMatch = await bcrypt.compare(password, userData.userInfo.password);
    if (isMatch) {
      //remove the  previous token of the user and create a new one
      const token = await userData.generateAuthToken();
      res.cookie("jwt", token)
      // {
      //   expires:new Date(Date.now()+ 300000),
      //   // secure:true
      // });
      res.status(200).send(userData);
    } else {
      res.status(400).send("no user found");
    }
  } catch (err) {
    console.log(err,"eroor");
    res.status(500).send("server error");
  }
});


app.post("/forgotPassword", async (req, res) => {
  
    try {
      const userData = await User.findOne({ "userInfo.email": req.body.email });
      if (userData) {
        let otpCode = Math.floor((Math.random() * 10000) + 1);
        let otpData = new Otp({
          email:req.body.email,
          code: otpCode,
          expiresIn: new Date().getTime() + 420000
        });
        const otpCreated = await otpData.save();
        await sendOtpEmail(req.body.email,otpCode)
        res.status(200).send("OTP sent to your email");
      } else {
        res.status(400).send("Email not found");
      }
    } catch (err) {
      console.log(err,"eroor catchh");
      res.status(500).send("server error");
    }
  });
  
  app.post("/changePassword", async (req, res) => {
    try {
      const otpData = await Otp.findOne({ "code":req.body.otp });
    const userData = await User.findOne({ "userInfo.email": req.body.email });
    if (otpData && userData) {
       
       const currentTime = new Date().getTime();
       const diff =  otpData.expiresIn - currentTime;
       console.log("the fo effo ffo",currentTime,otpData.expiresIn,diff);
       if(diff < 0){
        res.status(400).send("OTP expired");
       }else{
const newPassword = await (await bcrypt.hash(req.body.password, 10)).toString();
console.log("the new password",newPassword,typeof(newPassword));
        await User.updateOne(
          { "userInfo.email": req.body.email },
          {
            $set: {
              "userInfo.password": newPassword
            },
          }
        );
        await Otp.deleteOne({ "code": req.body.otp });
        res.status(200).send(userData);
       }
       
    }else{
      res.status(400).send("OTP not found");
    }
  } catch (err) {
      console.log(err,"eroor");
      res.status(500).send("server error");
    }
  });

app.post("/signUp", async (req, res) => {
  try {

    const checkEmailPresent = await User.findOne({
      "userInfo.email": req.body.email,
    });
    if (checkEmailPresent) {
      res.status(206).send("Email is already there. Go, Login");
    } else {
      const newUser = new User({
        userInfo: {
          userName: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phoneNumberMain: req.body.phoneNumber,
          gender: req.body.gender,
        },
        userCart: {
          countOfCart: 0,
        },
      });

      const token = await newUser.generateAuthToken();

      res.cookie("jwt", token);

      const newUserRegistered = await newUser.save();
      res.status(201).send(newUserRegistered);
    }
  } catch (err) {
    res.status(400).send("Could Not Add You, Try Again");
  }
});

app.post("/users", async (req, res) => {
  try {
    const userData = req.body.userData;
    if(req.body?.addUserOrder){
    await User.updateOne(
      { _id: userData._id },
      {
        $set: {
          userCart: userData.userCart,
          userAddress: userData.userAddress,
          userOrders: userData.userOrders
        },
      }
    );
    } else {
      await User.updateOne(
        { _id: userData._id },
        {
          $set: {
            userCart: userData.userCart,
            userAddress: userData.userAddress,
          },
        }
      );
    }
    res.status(201).send("Updated the dataBase");
  } catch (err) {
    res.status(500).send("server error");
  }
});


app.post("/editOrder", async (req, res) => {
  try {
    const payload = req.body.payload;
  
      await Order.updateOne(
        { _id: payload._id },
        {
          $set: {
            paymentStatus: payload.paymentStatus,
            orderStatus: payload.orderStatus,
            deliveryDate: payload.deliveryDate
          }
        }
      );
    res.status(201).send("Updated the dataBase");
  } catch (err) {
    res.status(500).send("server error");
  }
});

app.post("/deleteOrder", async (req, res) => {
  try {
    const id = req.body.id;
  
        await Order.deleteOne(
        { _id: id }
      );
    res.status(201).send("Updated the dataBase");
  } catch (err) {
    res.status(500).send("server error");
  }
});

