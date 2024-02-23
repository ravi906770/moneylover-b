// import { Request , Response , NextFunction } from "express";
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