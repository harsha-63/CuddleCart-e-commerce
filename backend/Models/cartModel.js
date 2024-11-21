import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Type.ObjectId,ref:"user" ,
        required:true
    },
    products:[{
      product:{type:mongoose.Schema.Type.ObjectId,ref:"Product",required:true},
      quantity:{type:Number,default:1,required:true}
    }]
},{timestamps:true})

const cartModel = mongoose.models.Cart || mongoose.model("Cart",cartSchema)

export default cartModel