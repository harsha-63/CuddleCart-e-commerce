import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String , required:true},
    description:{type:String , required:true},
    price:{type:Number , required:true},
    image:{type:Array , required:true},
    category:{type:String , required:true},
    newArrival:{type:Boolean,required:true},
    isDeleted:{type:Boolean,required:true,default:false}
    
})

const ProductModel = mongoose.models.Product || mongoose.model("Product",productSchema)

export default ProductModel