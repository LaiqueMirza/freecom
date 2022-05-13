
import User from "../schema/usersSchema.js";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import crypto from "crypto";

const routerFun = {
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
      } 
      }

export default routerFun;

