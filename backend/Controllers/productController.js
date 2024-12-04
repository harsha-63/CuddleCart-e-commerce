import Products from "../Models/productModel.js"
import CustomError from "../Utils/customError.js"
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
      const { name, description, price, category, stars } = req.body;
      if (!req.file || !req.file.path) {
        return next(new CustomError("Product image is required", 400));
      }
    
    const product = new Products({
        name, description, price, image:req.file.path, category, stars
    }) ;
    product.newArrival = true
    await product.save()  
    console.log(product);

    res.status(201).json({success: true, message: "Product created successfully",product:product});
}  
  //function for updateProduct
  export const updateProduct = async (req, res, next) => {
    const { productId } = req.params;
  
    // Find the product
    const product = await Products.findById(productId);
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
  
    // Check if the product is deleted
    if (product.isDeleted) {
      return next(new CustomError("Cannot update a deleted product", 400));
    }
  
    // Prepare updated data
    let updatedData = {};
    if (req.body) {
      updatedData = { ...req.body };
    }
  
    // Include the new image path if a file is uploaded
    if (req.file) {
      updatedData.image = req.file.path;
    }
  
    // Update the product with only provided fields
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { $set: updatedData },
      { new: true } 
    );
  
    // Check if the update was successful
    if (!updatedProduct) {
      return next(new CustomError("Failed to update product", 500));
    }
  
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  };
  
  //function for deleteProduct
  export const deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
  
    // Soft delete the product by setting isDeleted to true
    const product = await Products.findById(productId);
  
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
    product.isDeleted = !product.isDeleted;
    await product.save();
  
    res.status(200).json({ success: true, message: "Product deleted successfully", product });
  };
  

 
  


