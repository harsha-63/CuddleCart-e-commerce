import Products from "../Models/productModel.js"
import CustomError from "../Utils/customError.js"
import {joiProductSchema} from '../Models/validation.js'
import mongoose from "mongoose"


//function for getAllProducts
export const getAllProducts = async (req, res, next) => {
  const products = await Products.find();

  if (!products || products.length === 0) {
    return next(new CustomError("No products available", 404));
  }

  res.status(200).json({ success: true, data: products });
};


//function for getProductById
export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new CustomError("Invalid ID format", 400));
  }
  const product = await Products.findById(id);
  if (!product) {
    return next(new CustomError("Product not found", 404));
  }
  res.status(200).json({ success: true, data: product });
};


//function for getProductsByCategory
export const getProductsByCategory = async (req, res, next) => {
  const { category } = req.params;
  const products = await Products.find({ category });
  if (!products || products.length === 0) {
    return next(new CustomError("No products found for the given category", 404));
  }
  res.status(200).json({ success: true, data: products });
};




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
      const existingProduct = await Products.findOne({ name });
      if (existingProduct) {
        return next(new CustomError("A product with the same name already exists", 400));
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
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new CustomError("Invalid ID format", 400));
    }
  
    // Find the product
    const product = await Products.findById(id);
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
    // if (product.isDeleted) {
    //   return next(new CustomError("Cannot update a deleted product", 400));
    // }
    let updatedData = {};
    if (req.body) {
      updatedData = { ...req.body };
    }
    if (req.file) {
      updatedData.image = req.file.path;
    }
  
    // Update the product with only provided fields
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
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
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new CustomError("Invalid ID format", 400));
    }
  
    // Soft delete the product by setting isDeleted to true
    const product = await Products.findById(id);
  
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
    product.isDeleted = !product.isDeleted;
    await product.save();
  
    res.status(200).json({status: "success",message: `Product ${product.isDeleted? "deleted" : "restored"} successfully`});
  };

   // function for restoring deleted products
  //  export const restoreProducts = async (req, res, next) => {
  //   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //     return next(new CustomError("Invalid ID format", 400)); 
  // }
  //   const restoredProduct = await Products.findByIdAndUpdate(
  //     req.params.id,
  //     { $set: { isDeleted: false } },
  //     { new: true }
  //   );
  //   if (!restoredProduct) return next(new CustomError("Product not found", 404));
  //   res.status(200).json({
  //     message: "Product restored successfully"});
  // };
  

 
  


