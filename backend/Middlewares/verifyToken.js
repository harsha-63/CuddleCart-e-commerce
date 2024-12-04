import jwt from 'jsonwebtoken'
import CustomError from '../Utils/customError.js'


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
                next();
            })
        }
        catch(err){
            next(err)
        }
        
    }

    export const verifyAdminToken = (req, res, next) => {
        verifyToken(req, res, async() => {
            
            if (!req.user) {
                return next(new CustomError("You are not authorized", 403));
              }
          if (!req.user.isAdmin) {
            return next(new CustomError("Access denied. Admin only.", 403));
          }
          req.isAdmin = req.user.isAdmin
          next();
        });
      };
      

