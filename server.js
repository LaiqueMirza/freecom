import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Product from "./backend/productSchema.js";
import User from "./backend/usersSchema.js";
import Razorpay from "razorpay";
import bcrypt from "bcryptjs";
import cors from "cors";
import shortid from "shortid";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config({ path: 'config.env' });

const app = express();

app.use(cors());
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cookieParser())
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// const url = "mongodb://localhost:27017/jeanEcom";
const PORT = process.env.PORT || 5000;
const CONNECTION_URL ='mongodb://mirzalaique:laique1562000@cluster0-shard-00-00.lr8jw.mongodb.net:27017,cluster0-shard-00-01.lr8jw.mongodb.net:27017,cluster0-shard-00-02.lr8jw.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-s3gu4a-shard-0&authSource=admin&retryWrites=true&w=majority'
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
.catch(err => {});

// heroku hosting step

if(process.env.NODE_ENV === "production"){
  app.use(express.static("app/build"));

}



const creatingOneProduct = async () => {
  try {
    const newProduct = new Product({
      name: "checking",
      preview: "checking",
      photos: ["checking", "checking"],
      description: "checking",
      size: [90, 80],
      isAccessory: true,
      brand: "checking",
      price: 999,
    });

    const result = await newProduct.save();
    // for inserting multiple product or document at once
    // const result = await Product.insertMany([ all the new products]);
    
  } catch (err) {
    res.status(500).send(err);
  }
};
// creatingOneProduct()

const getProduct = async () => {
  const result = await Product.find({ name: "Men" });
};

// getProduct()

// app.post("/verifyPayment", (req, res) => {
//   // do a validation
//   const secret = "12345678";

//   console.log(req.body, ">>>>>>>>");

//   const crypto = require("crypto");

//   const shasum = crypto.createHmac("sha256", secret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   console.log(digest, req.headers["x-razorpay-signature"]);

//   if (digest === req.headers["x-razorpay-signature"]) {
//     console.log("request is legit");
//     // process it
//     require("fs").writeFileSync(
//       "payment1.json",
//       JSON.stringify(req.body, null, 4)
//     );
//   } else {
//     // pass it
//   }
//   res.json({ status: "ok" });
// });

app.post("/verifyPayment", (req, res) => {
  const order = req.body;

  const text = order.razorpay_order_id + "|" + order.razorpay_payment_id;
  var signature = crypto
    .createHmac("sha256", "12345678")
    .update(text)
    .digest("hex");

  if (signature === order.razorpay_signature) {
    // You can update payment details in your database here
    return res.status(201).send({ message: "Successful payment" });
  } else {
    return res.status(400).send({ message: "Payment verification failed" });
  }
});



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
    shippingCharge = bagTotal > 20000 ? "FREE" : 50;
    if (typeof shippingCharge === "number") {
      totalAmount += shippingCharge;
    }

    req.totalAmount = totalAmount
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}
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

// app.get('/api/products',(req,res) => {
//     res.send(data.products)
// })

//pagination of backend so we get only 50 data at a time
//model is the model of mongo db database here it is product

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    let limit = 50;
    let lastData;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const inMongo = await model.countDocuments().exec();
    const result = {};

    if (endIndex + 50 < inMongo) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    } else if (endIndex < inMongo) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
      lastData = inMongo - endIndex;
    } else if (endIndex >= inMongo) {
      res.status(500).json({ message: "Yay You Have Seen it All" });
      return;
    }

    try {
      if (lastData) {
        result.result = await model
          .find()
          .limit(lastData)
          .skip(startIndex)
          .exec();
        res.paginatedResults = result;
        next();
      } else {
        result.result = await model.find().limit(limit).skip(startIndex).exec();
        res.paginatedResults = result;
        next();
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

app.get("/api/products", paginatedResults(Product), async (req, res) => {
  try {
    const result = await Product.find();

    res.json(res.paginatedResults);
    // res.json({status: 200, result})

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
      let nameOfProduct = searchedValue?.productName?.toLowerCase();
      return nameOfProduct?.includes(word);
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

// app.get("/login", (req,res) =>{
// 	res.send(users)
// })

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ "userInfo.email": email });
    const isMatch = await bcrypt.compare(password, userData.userInfo.password);
    if (isMatch) {
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
    res.status(500).send("server error");
  }
});

app.post("/signUp", async (req, res) => {
  try {

    const checkEmailPresent = await User.findOne({
      "userInfo.email": req.body.email,
    });
    const checkNumberPresent = await User.findOne({
      "userInfo.phoneNumberMain": req.body.phoneNumber,
    });
    if (checkEmailPresent || checkNumberPresent) {
      res.status(206).send("Email or Phone Number is already there. Go, Login");
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
    const result = await User.updateOne(
      { _id: userData._id },
      {
        $set: {
          userCart: userData.userCart,
          userAddress: userData.userAddress,
        },
      }
    );
    res.status(201).send("Updated the dataBase");
  } catch (err) {
    res.status(500).send("server error");
  }
});

