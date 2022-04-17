import express  from 'express';
import routerFun  from "./routerFunc.js";
import auth from "../middleware/auth.js";
// import auth  from '../middleware/auth';

const router = express.Router();

router.get("/api/products", routerFun.apiProducts);

router.post("/order",auth, routerFun.creatingNewOrder);

router.get("/orders", routerFun.allTheOrders);

router.get("/products/:product", routerFun.searchedProduct);

router.post("/login", routerFun.loginUser);

router.post("/forgotPassword", routerFun.forgotPassword);

router.post("/changePassword", routerFun.changePassword);

router.post("/signUp", routerFun.signUpUser);

router.post("/users", routerFun.updatingUser);

router.post("/editOrder", routerFun.editOrder);

router.post("/deleteOrder", routerFun.deleteOrder);

export default router;
