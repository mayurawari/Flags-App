import { connect } from "mongoose"

const connectdb=async(url)=>{
    await connect(url);
}

export default connectdb;