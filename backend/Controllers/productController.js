import Products from "../Models/productModel.js"
import CustomError from "../Utils/customError.js"
import Order from '../Models/orderModel.js'
import {joiProductSchema} from '../Models/validation.js'


//function for getAllProducts
export const getAllProducts = async(req,res)=>{
    try{
        const products = await Products.find({isDeleted:false})
        if(!products){
            res.status(404).json({success:false,message:"No products"})
        }
          res.json({data:products})
    }
    catch(error){
        res.json({success:false,message:error.message})

    } 
}

//function for getProductById
export const getProductById = async(req,res)=>{
    try{
    const product = await Products.findById(req.params.id)
    if(!product){
        res.status(404).json({success:false,message:"Product not found"})
    }
    res.status(200).json({data:product})
   } 
   catch(error){
    console.log(error);
    res.status(500).json({success:false,message:error.message})
    
   }
}

//function for getProductsByCategory
export const getProductsByCategory = async(req,res)=>{
    try{
        const {category} = req.params
        const products = await Products.find({category}) 
        if(!products){
            res.status(404).json({success:false,message:"No products found"})
        }
        res.status(200).json({data:products})
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:error.message})
        
    }
    
}

                                    //admin functionalities
  
//function for create product
export const createProduct  = async (req,res,next)=>{
    const {error } = joiProductSchema.validate(req.body);
    if (error) {
        return next(new CustomError(error.details[0].message, 400));
      }
      const { name, description, price, image, category, stars } = req.body;
    const product = new Products({
        name, description, price, image, category, stars
    }) ;
    await product.save()  
    console.log(product);

    res.status(201).json({success: true, message: "Product created successfully",product:product});
}  
  //function for updateProduct
  export const updateProduct = async (req,res,next)=>{
     const {productId} = req.params
     const product = await Products.findById(productId,{...req.body},{new:true})
     if(!product){
        return next(new CustomError("Product not found", 404))
     }
     if(product.isDeleted){
        return next(new CustomError("Cannot update a deleted product",400))
     }
    res.status(200).json({success:true,message:"product updated successfully"})
    
  }
  //function for deleteProduct
export const deleteProduct = async (req, res,next) => {
   
    const { productId } = req.params;
    const product = await Products.findByIdAndDelete(productId,{$set:{isDeleted:true}});
    if (!product) {
     return next(new CustomError("product not found",404))
    }
    await product.save()
    res.status(200).json({ message: "product delete successfully" })
  
};

  //function for getTotalPurchase
  export const getTotalPurchase = async (req, res, next) => {
    const totalPurchase = new Order.aggregate([
        {$unwind:"$products"},{$group:{_id:null,totalProducts:{$sum:"$products.quantity"}}}
    ])
  
    if (!totalPurchase || totalPurchase.length === 0) {
      return next(new CustomError("No products purchased found", 404));
    }
  
    const total = totalPurchase[0].totalProducts;
  
    res.status(200).json({success: true,totalPurchase: total});
  };

  //function for getTotalRevenue
  export const getTotalRevenue = async(req,res,next)=>{
    // const totalRevenue = new Order.aggregate([
    //     {$unwind:"$products"},{$group:{$multiply:}}
    //   ])
  }
  

  


