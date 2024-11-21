import Product from "../Models/productModel"


//function for getAllProducts
export const getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find()
        if(!products){
            res.status(404).json({success:false,message:"No products"})
        }
          res.json({successs:true,data:products})
    }
    catch(error){
        res.json({success:false,message:error.message})

    } 
}

//function for getProductById
export const getProductById = async(req,res)=>{
    try{
    const {id} = req.params
    const product = await Product.findById({id})
    if(!product){
        res.status(404).json({success:false,message:"Product not found"})
    }
    res.status(200).json({success:true,data:product})
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
        res.status(200).json({success:true,data:products})
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:error.message})
        
    }
    
}

//function for addToCart
export const addToCart = async(req,res)=>{
    
}

//function for updateCart
export const updateCart = async(req,res)=>{
    
}

//function for DeleteProduct from cart
export const deleteProduct = async(req,res)=>{
    
}


