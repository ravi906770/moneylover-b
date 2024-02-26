import { Request , Response , NextFunction } from "express";
import { Schema, ValidationResult } from "joi";
// import jwt from "jsonwebtoken"

// export const requireSignIn = async (req : Request, res:Response,next : NextFunction): Promise<void>=>{
//     const token = req.headers.authorization as string;
//     const secretKey: string = "12345";
//    try {
//     const decode = await jwt.verify(token , secretKey);
//     req.user = decode;
//     next();
    
// }
//    catch (error) {
//     console.log(error);
//    } 
// }


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