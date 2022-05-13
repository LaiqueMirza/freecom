import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import auth from "./backend/middleware/auth.js";
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
const CONNECTION_URL = 'mongodb+srv://userName:password@cluster0.lr8jw.mongodb.net/IConnect?retryWrites=true&w=majority'
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
app.get("/getUsers", auth, async (req, res) => {
  // const result = { data: "authenticated" }
  // res.json({ status: 200, result });
  res.status(200).send();

});

