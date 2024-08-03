import express from "express";
import { config } from "dotenv";
import connectdb from "./src/Config/db.js";
import userroute from "./src/Routes/userroute.js";
import auth from "./src/Middlewares/auth.js";
import flagsroute from "./src/Routes/flagsroute.js";
config();


const port=process.env.PORT || 8080;
const url=process.env.DB_URL;


const server=express();
server.use(express.json());
server.use("/api",userroute);
server.use("/api/flags",auth,flagsroute);

server.get("/",(req,res)=>{
     res.send("this is home route");
})


server.listen(port,async()=>{
    try {
        await connectdb(url);
        console.log("connected");
        console.log(`server is running on port : ${port}`);
    } catch (error) {
        console.log(error);
    }
})
// {
//   "username":"example1",
//   "password":"123456"
// }