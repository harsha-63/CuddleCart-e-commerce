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
    purchaseDate:{type:Date,default:Date.now},
    orderId:{type:String},
    totalAmount:{type:Number},
    paymentMethod:{type:String,enum: ['cash on delivery', 'stripe'],
        default: 'cash on delivery'},
    paymentStatus:{type:String, enum: ['pending', 'paid', 'cancelled'],default:"pending"},
    shippingStatus:{type:String, enum: ['processing', 'shipped', 'delivered', 'cancelled'],dafault:"processing"},
    userDetails: {
        name: { type: String, required: true },
        mobile: { type: String, required: true },
        address: { type: String, required: true }
      },
      sessionId: {  // For Stripe session tracking
        type: String,
      },


},{timestamps:true})


const orderModel = mongoose.models.Order || mongoose.model("Order",orderSchema)

export default orderModel

