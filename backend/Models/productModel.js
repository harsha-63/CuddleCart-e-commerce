import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String , required:true},
    description:{type:String , required:true},
    price:{type:Number , required:true},
    image:{type:Array ,},
    category:{type:String , required:true},
    newArrival:{type:Boolean,default:true},
    isDeleted:{type:Boolean,default:false}
    
})

const ProductModel = mongoose.models.Product || mongoose.model("Product",productSchema)

export default ProductModel