import express  from 'express';
import routerFun  from "./routerFunc.js";
import auth from "../middleware/auth.js";
// import auth  from '../middleware/auth';

const router = express.Router();

router.post("/login", routerFun.loginUser);


router.post("/signUp", routerFun.signUpUser);

export default router;
