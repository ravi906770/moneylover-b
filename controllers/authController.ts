import { comparePassword, hashPassword } from "../helper/authHelper";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import passport from "passport";
import multer from "multer"
import path from "path";
import { upload } from "../helper/multerHelper";






// 904326384994-3q7ij4sr0k6ljirjk4ani7e4l67pot6m.apps.googleusercontent.com  : google clinet id 
// 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 : secret

export const registerController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstname , lastname, email, password, mobile_no } = req.body;
        
        const existinguser = await UserModel.findOne({ email });
        if (existinguser) {
            res.send({
                success: false,
                message: 'Already register please log in'
            })
            return;
        }

        const hashedPassword = await hashPassword(password)


        const user = new UserModel({
            firstname, lastname, email
            , mobile_no, password: hashedPassword,
        }).save();

        res.send({
            success: true,
            message: "User Registered Successfuly",
            user
        })

        // res.json({ message: "Registration Successfully!!" });


    } catch (error) {
        res.send("Error in Registration!!")
    }
}


export const checkEmail = async (req: Request, res: Response): Promise<void> =>{
    try {
        const email = req.params.email
        const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.json({ exists: true });
      return
    }
    res.json({ exists: false });

    } catch (error) {
        res.json({
         success: false,
          message: 'Server error' 
        })
    }
}


export const loginController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email , password} = req.body;

       
        const user = await UserModel.findOne({email})
     
        if(!user){
         res.json({
             success : false,
             message : "User is not found!"
         })
         return
        }
     
     
        const match = await comparePassword(password , user.password);
        if(!match){
         res.json({
             success : false ,
             message : "Password is invalid"
         })
         return
         }
     
         if(match){
             const secretKey = "12345"
     
             const access_token = jwt.sign({_id : user._id} , secretKey , {expiresIn : "1d"})
             const refresh_token = jwt.sign({_id : user._id} , secretKey , {expiresIn : "10d"})
     
             if(user){
                 user.refresh_token = refresh_token;
             }
             const result = await user.save()
     
             res.cookie("jwt" , refresh_token , { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000})
     
             res.json({
                 success : true,
                 message : "Login Successfully!!",
                 access_token
             })
     
         }
     
     
        
    } catch (error) {
        res.json({ message: "Error in Login" });
    }
  

}




// export const logout = async (req: Request, res: Response): Promise<void> =>{
//   req.logout(done(null))
// }

// export const logout = async (req: Request, res: Response): Promise<void> =>{
//     res.json({
//         success : false,
//         message : "error in login"
//     })
// }


export const refreshTokenGenerate = async (req: Request, res: Response): Promise<void> =>{
 
    const cookies = await req.cookies;
    console.log("cookies reached")
    // console.log(cookies);
    if (!cookies?.jwt) {
        res.json("Cookies not found");
        return 
    }
   
 
    const refreshToken = cookies.jwt;
 
    const user = await UserModel.findOne({refreshToken});
    if(!user){
     res.json("User is not registered");
     return
    }
 
    jwt.verify(
        refreshToken,
        "12345",
        (err :any)=>{
            if(err){
                return res.json("error in refresh token")
            }
 
            const accessToken = jwt.sign({_id : user._id}, "12345" , {expiresIn : "10s"});
 
            res.json({accessToken});
        }
    )
}



// forgot password

export const forgotPasswordController = async (req: Request, res: Response): Promise<void> =>{
    try {
        
    const {email , password , cPassword} = req.body;
    // console.log(email);
    // console.log(password);
    // console.log(cPassword);
    

        if(!(email || password || cPassword)){
        res.json({
            success : false,
            message : "All field is required!!"
        })
        return
    }
    const findUser = await UserModel.findOne({email});
    if(!findUser){
        res.json({
            success : false,
            message : "User is not find"
        })
        return
    }
    if(password === cPassword){
        const hashed = await hashPassword(cPassword);
        await UserModel.findByIdAndUpdate(findUser._id , {password : hashed})
    }else{
        res.json({
            success : false,
            message : "Password is not match with confirm password!!"
        })
        return
    }

   

    res.json({
        success : true,
        message : "Password updated successfully!!!"
    })


    } catch (error) {
        res.json({
            success : false,
            message : "Error occured in change password"
        })
    }
}



export const updateProfileController = async (req: Request, res: Response): Promise<void> =>{
    try {

        const userId = req.user
        const {firstname , lastname , email , mobile_no} = req.body

        const data = await UserModel.findByIdAndUpdate(userId,{firstname,lastname,email,mobile_no}, {new:true})

        await data?.save();

        res.json({
            success : true,
            message : "Profile Update Successfully!!",
            data
        })


    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            message : "error in profile updation!!"
        })
    }
}


export const deleteController = async (req: Request, res: Response): Promise<void> =>{
    try {
        const userId = req.user
        const data = await UserModel.findByIdAndDelete(userId)
        res.json({
            success : true,
            message : "Profile Delete Successfully!!",
            data
        })
    } catch (error) {
        res.json({
            success : false,
            message : "error in profile deletion!!"
        })
    }
}


// get single user 

export const getSingleUserController = async (req: Request, res: Response): Promise<void> =>{
    try {
        const userId = req.user
        const data = await UserModel.findById(userId)
        res.json({
            success : true,
            message : "User get Successfully!!",
            data
        })
    } catch (error) {
        console.log(error);
        
        res.json({
            success : false,
            message : "Error in get profile!!"
        })
    }
}




