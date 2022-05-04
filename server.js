import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import auth from "./backend/middleware/auth.js";
import Razorpay from "razorpay";
import cors from "cors";
import shortid from "shortid";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import routes from "./backend/router/router.js";
dotenv.config({ path: 'config.env' });

const app = express();

app.use(cors());
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cookieParser())
app.use(routes);


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
}))
.catch(err => {
});

// heroku hosting step
if(process.env.NODE_ENV === "production"){
  app.use(express.static("app/build"));
}

// PAYMENT ------------------------------------------------------------

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/verifyPayment", (req, res) => {

let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                .update(body.toString())
                                .digest('hex');
if(expectedSignature === req.body.razorpay_signature){
 res.status(200).send();
}else{
    res.status(500).send({"message":"Payment verification failed"});
  }
  });



// jwt must be provided
app.post("/razorpay",auth, async (req, res) => {
const totalAmount = req.body.totalAmount
  const payment_capture = 1;
  const amount = totalAmount*100;

  const options = {
    amount: amount,
    currency:"INR",
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options, function(err, order) {
      if (err) {
      }
  
  res.json({
    id: order.id,
    key: process.env.RAZORPAY_KEY_ID
  });
      });
    
  } catch (error) {
    res.json({ status: 500, error });

  }
});
