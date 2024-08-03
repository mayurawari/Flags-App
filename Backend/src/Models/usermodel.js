import { model, Schema } from "mongoose";

const userschema=new Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
})

const usermodel=model("userdetails",userschema);
export default usermodel;