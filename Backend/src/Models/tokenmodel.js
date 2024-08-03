import { model, Schema } from "mongoose";

const tokenschema=new Schema({
    token:{type:String,required:true}
})
const tokenmodel=model("tokens",tokenschema);

export default tokenmodel;