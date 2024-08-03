import { Router } from "express";
import usermodel from "../Models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { config } from "dotenv";
import tokenmodel from "../Models/tokenmodel.js";
config();

const privateKey=process.env.PRIVATE_KEY;
const userroute=Router();

userroute.post("/register",async(req,res)=>{
    const {username,email,password}=req.body;
   try {
       if(!username || !email || !password){
        return res.send("please provide all fields 🔓");
       }
    
    const exist=await usermodel.findOne({username:username});
    
    if(exist){
        return res.send(`You are already registred try to login 📝`);
    }

    bcrypt.hash(password,12,async(err,result)=>{
          if(err) return console.log(err);
        const user=new usermodel({username,email,password:result});
        await user.save();

    })
    
    res.send(`User registered successfully 🔑`);
    
   } catch (error) {
    console.log(error);
    return res.send(error);
   }
})

userroute.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    try {
        if(!username  || !password){
            return res.send("please provide all fields");
           }
        const exist=await usermodel.findOne({username:username});
         if(!exist){
            return res.send("please register  and then try to login (❁´◡`❁)");
         }

         bcrypt.compare(password,exist.password,async(err)=>{
            if(err) return console.log(err);

            jwt.sign({ username:username,password:password }, privateKey, { algorithm: 'HS256' }, async(err, resultedtoken) =>{
                 if(err) return console.log(err);
                //  const data=new tokenmodel({token:resultedtoken});
                //  const checktoken=await tokenmodel.findOne({token:resultedtoken});
                //  if(!checktoken){
                //      await data.save();
                //  }
                 console.log(resultedtoken);
              });
            })
            res.send("user logged in successfully 😉");

    } catch (error) {
        console.log(error);
        return res.send(error);
    }
})

export default userroute;