import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    products:[
        {
         productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        quantity:{
            type:Number,required:true,default:1
        }
     }
    ],
    purchaseDate:{
        type:Date,
        dafault:Date.now

    },
    // // orderId:{
    // //     type:String,
    // //     required:true
    // // },
    // // totalPrice:{
    // //     type:Number,
    // //     required:true
    // },
    paymentStatus:{
        type:String,
        default:"pending"
    },
    shippingStatus:{
        type:String,
        dafault:"pending"
    },
    userDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
      }


},{timestamps:true})


const orderModel = mongoose.models.Order || mongoose.model("Order",orderSchema)

export default orderModel

