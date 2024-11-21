import mongoose from "mongoose";


const cartSchema = new mangoose.Schema({
    userId :{
        type:mongoose.Schema.Type.ObjectId,ref:"user" ,
        required:true
    },
    products:[{
      product:{type:mongoose.Schema.Type.ObjectId,ref:"Product",required:true},
      quantity:{type:Number,default:1,required:true}
    }]
})

module.exports = mongoose.model("Cart",cartSchema)