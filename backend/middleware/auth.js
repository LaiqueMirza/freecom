import Jwt from "jsonwebtoken";
import User from "../schema/usersSchema.js";

const auth = async (req,res,next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = Jwt.verify(token, process.env.SECRET_KEY)
   console.log(verifyUser, "verifyUser",token,"token");
if(verifyUser){
  next();
}
   else {
  throw new Error('Whoops!')
   }
  } catch (err) {
    res.status(500).send(err);
  }
}

export default auth;