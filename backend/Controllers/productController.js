import Product from "../Models/productModel.js"
import CustomError from "../Utils/customError.js"


//function for getAllProducts
export const getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find()
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
    const product = await Product.findById(req.params.id)
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
        const products = await Product.find({category}) 
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
    const {name,category,price,image,description} = req.body
    if (!name || !category || !price || !description || !image) {
        return next(new CustomError("All fields are required", 400));
      }
    const product = new Product({
        name,
        category,
        price,
        description,
        stock,
        image, 
    }) ;
    await product.save()  

    res.status(201).json({success: true, message: "Product created successfully",product:product});
}  

//function for deleteProduct
export const deleteProduct = async (req, res,next) => {
   
      const { productId } = req.params;
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
       return next(new CustomError("product not found",404))
      }
      res.status(200).json({ message: "product delete successfully" })
    
  };

  //function for updateProduct
  export const updateProduct = async (req,es,next)=>{
    
  }


