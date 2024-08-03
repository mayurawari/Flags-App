import jwt from "jsonwebtoken"
import { config } from "dotenv";
config();

const privateKey=process.env.PRIVATE_KEY;

const auth  = async(req,res,next)=> {
    const header=req.headers['authorization'];
   try {
    if(!header){
        return res.send("token is not present");
    }
    const token=header.split(" ")[1];
    jwt.verify(token,privateKey,(err,decoded)=>{
        if(err) return res.send(err);

        req.user=decoded;
        next();
    })
   } catch (error) {
    console.log(error);
    res.send(error);
   }

}

export default auth;