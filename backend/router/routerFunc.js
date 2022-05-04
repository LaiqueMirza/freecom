
import Product from "../schema/productSchema.js";
import User from "../schema/usersSchema.js";
import Order from "../schema/orderSchema.js";
import Otp from "../schema/otpSchema.js";
import sendEmailOnOrderCreation from "../controllers/sendEmail.js";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import bcrypt from "bcryptjs";
import cors from "cors";
import shortid from "shortid";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import sendOtpEmail from "../controllers/sendOtpEmail.js";
import crypto from "crypto";

const routerFun = {
    apiProducts: async (req, res) => {
        try {
          const result = await Product.find();
          res.json({status: 200, result})
      
        } catch (err) {
          res.json({ status: 500, err });
        }
      },
      allTheOrders: async (req, res) => {
        try {
          const result = await Order.find();
          res.json({status: 200, result})
      
        } catch (err) {
          res.json({ status: 500, err });
        }
      },
      searchedProduct: async (req, res) => {
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
      },
      creatingNewOrder: async (req, res) => {
        try {
          const userName= req.body.payload.userName;
          const userEmail= req.body.payload.userEmail;
          const productName= req.body.payload.productName; 
          const selectedSize= req.body.payload.selectedSize;
          const quantity= req.body.payload.quantity;
          const price= req.body.payload.price;
          const onlinePayment= req.body.payload.onlinePayment_Id;
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
                onlinePayment_Id: req.body.payload.onlinePayment_Id,
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
          res.status(500).send({"message":"Could not create the order, Try again"});
        }
      },  
      loginUser: async (req, res) => { 
      try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({ "userInfo.email": email });
        const isMatch = await bcrypt.compare(password, userData.userInfo.password);
        if (isMatch) {
          //remove the  previous token of the user and create a new one
          const token = await userData.generateAuthToken();
          res.cookie("jwt", token)
         
          res.status(200).send(userData);
        } else {
          res.status(400).send({"message":"no user found"});
        }
      } catch (err) {
        res.status(500).send({"message":"server error"});
      }
      },
      forgotPassword: async (req, res) => {
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
            res.status(200).send({"message":"OTP sent to your email"});
          } else {
            res.status(400).send({"message":"Email not found"});
          }
        } catch (err) {
          res.status(500).send({"message":"server error"});
        }
      },
      changePassword: async (req, res) => {
        try {
          const otpData = await Otp.findOne({ "code":req.body.otp });
        const userData = await User.findOne({ "userInfo.email": req.body.email });
        if (otpData && userData) {
           
           const currentTime = new Date().getTime();
           const diff =  otpData.expiresIn - currentTime;
           if(diff < 0){
            res.status(400).send({"message":"OTP expired"});
           }else{
    const newPassword = await (await bcrypt.hash(req.body.password, 10)).toString();
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
          res.status(400).send({"message":"OTP not found"});
        }
      } catch (err) {
          res.status(500).send({"message":"server error"});
        }
      },
      signUpUser: async (req, res) => {
        try {

          const checkEmailPresent = await User.findOne({
            "userInfo.email": req.body.email,
          });
          if (checkEmailPresent) {
            res.status(206).send({"message":"Email is already there. Go, Login"});
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
          res.status(400).send({"message":"Could Not Add You, Try Again"});
        }
      },
      updatingUser: async (req, res) => {
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
          res.status(201).send({"message":"Updated the dataBase"});
        } catch (err) {
          res.status(500).send({"message":"server error"});
        }
      },
      editOrder: async (req, res) => {
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
          res.status(201).send({"message":"Updated the dataBase"});
        } catch (err) {
          res.status(500).send({"message":"server error"});
        }
      },
      deleteOrder: async (req, res) => {
        try {
          const id = req.body.id;
        
              await Order.deleteOne(
              { _id: id }
            );
          res.status(201).send({"message":"Updated the dataBase"});
        } catch (err) {
          res.status(500).send({"message":"server error"});
        }
      } 
      }

export default routerFun;

