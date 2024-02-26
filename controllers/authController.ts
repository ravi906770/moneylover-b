import { comparePassword, hashPassword } from "../helper/authHelper";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

export const registerController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstname, lastname, email, password, mobile_no, avatar } = req.body;
        
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
            , mobile_no, password: hashedPassword
        }).save();

        res.send({
            success: true,
            message: "User Registered Successfuly",
            user
        })

        res.json({ message: "Registration Successfully!!" });


    } catch (error) {
        res.send("Error in Registration!!")
    }
}


export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.json({
                success: false,
                message: "Invalid Email or Password!"
            })
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            res.json({
                success: false,
                message: "Not User , Please Register!!"
            })
        }

        const match = await comparePassword(password, user!.password);
        if (!match) {
            res.json({
                success: false,
                message: "Invalid Email or Password!!"
            })
        }
        else if (match) {

            const secretKey = "12345"



            const access_token = jwt.sign({ _id: user?._id }, secretKey, { expiresIn:"10s" });
            const refresh_token = jwt.sign({_id : user?._id} , secretKey , { expiresIn : "1d" })
            // const user= {
            //     firstname: user?.firstname,
            //     lastname: user?.lastname,
            //     email: user?.email,
            //     mobile_no: user?.mobile_no,


            if (user) {
                user.refresh_token = refresh_token;
            }
            const result = await user?.save();

            res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000})

            res.json({
                success: true,
                message: "Login Successful!!",
                access_token
            });
        }

    } catch (error) {
        res.json({ message: "Error in Login" });
    }
}


