import { Request , Response , NextFunction } from "express";
import { Schema, ValidationResult } from "joi";
import jwt from "jsonwebtoken"

interface customRequest extends Request {
  user?:string;
  }
 export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
      try {
          const authHeader = req.headers?.authorization ;
          // console.log(authHeader);
          
          if (!authHeader) {
             res.json({
                success : false,
                message : "You are not authorized!!"
              });
              return 
          }
   
          const token = authHeader.split(' ')[1];
          if (!token) {
               res.json({
                success : false,
                message : "Can't find the token!!"
              });
              return
          }
   
          jwt.verify(token,"12345", (err: any, decoded: any) => {
              if (err) {
                   res.json({
                    success : false,
                    message : "token is not verified!!!"
                  });
                  return
              }
           
              req.user = decoded._id;
             
              next();
          });
      } catch (error) {
          res.json({
            success : false,
            message : "Internal Server error"
          });
          return
      }
  };

   


export const validateSchema = <T>(schema: Schema<T>) => {
        return async (req: Request, res: Response, next: NextFunction) => {
          try {
            const payload = req.body;
      
            // Perform validation
            const { error, value }: ValidationResult<T> = schema.validate(payload);
      
            if (error) {
              return res.status(400).json({ error });
            } else {
              next();
            }
          } catch (error) {
            next(error); // Forward error to the error handler middleware
          }
        };
      };