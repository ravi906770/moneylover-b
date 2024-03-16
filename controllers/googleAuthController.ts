
import { Request, Response } from 'express';


export const loginSuccess = async (req: Request, res: Response): Promise<void> =>{
    if(req.user){
        res.json({
            success : true,
            message : "success login",
            user : req.user,
            // cookies : req.cookies
        })
    }else{
        res.json({
            success : false,
            message : "Not Authorized"
        })
    }
    
}


export const loginFailed = async (req: Request, res: Response): Promise<void> =>{
    res.json({
        success : false,
        message : "error in login"
    })
}
