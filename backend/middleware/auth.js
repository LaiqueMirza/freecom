import Jwt from "jsonwebtoken";
import User from "../schema/usersSchema.js";

const auth = async (req,res,next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = Jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOne({_id:verifyUser._id});
    let cartProducts = user.userCart.itemsInCart
    let bagTotal = 0;
    let totalAmount = 0;
    {
      cartProducts?.map((product) => (bagTotal = bagTotal + product?.totalPrice));
    }
    totalAmount += bagTotal;
    let shippingCharge = 0;
    shippingCharge = bagTotal > 500 ? "FREE" : 30;
    if (typeof shippingCharge === "number") {
      totalAmount += shippingCharge;
    }
    if(req?.body?.totalAmount == totalAmount || req?.body?.payload?.totalAmount == totalAmount){
      next();
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export default auth;