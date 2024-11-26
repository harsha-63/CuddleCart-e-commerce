import jwt from 'jsonwebtoken'


export const verifyToken = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({success:false,message:"No token provided"})
        }
            const token = authHeader.split(" ")[1];
            if(!token){
                return res.status(401).json({success:false,message:"Token is required"})

            }
            jwt.verify(token,process.env.JWT_TOKEN,(err,user)=>{
                if(err){
                    return res.status(401).json({success:false,message:"Invalid Token",error:err})
                }
                req.user = user;
                req.isAdmin = user.isAdmin
                next();

            })
        }
        catch(err){
            next(err)
        }
        
    }

