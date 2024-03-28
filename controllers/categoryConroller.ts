import { Request, Response } from "express";
import CategoryModel from "../models/categoryModel";
import { ReadableStreamDefaultController } from "node:stream/web";


export const createCategory = async(req : Request , res: Response) : Promise<void>=>{
    try {
        const userId = req.user
        const {category , budget_boundry} = req.body;
        if(!(category || budget_boundry)){
             res.json("field is required!!")
             return
        }

        const existingCategory = await CategoryModel.findOne({ userId, category })
        if(existingCategory){
            res.json("category is already there!!!")
            return
        }

        const newCategory = await new CategoryModel({
            category,
            budget_boundry,
            userId :userId
        }).save()

        res.json({
            success : true,
            message : "Category created",
            newCategory
        })
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
}




export const getCategory = async(req : Request , res: Response) : Promise<void>=>{
    try {
        const userId = req.user
        const getCategory =  await CategoryModel.find({userId});
        res.json({
            success : true,
            message : "All Categories",
            getCategory
        })

        // console.log("________")
        // console.log(getCategory);
    } catch (error) {
        console.log(error);
        res.json("Error in Get the Category")
    }
}



export const getBudgetBoundry =async(req : Request , res: Response) : Promise<void> =>{
    try {
        const userId = req.user
        const data = await CategoryModel.find({userId})
        res.json({
            success : true,
            message : "Get the Budget Successfully",
            data
        })
    } catch (error) {
        res.json({
            success : false,
            message : "error in  getting Budget",
        })
    }
}




export const updateCategoryController = async(req : Request , res: Response) : Promise<void> =>{
        try {
            const userId = req.user;
            const {category , budget_boundry} = req.body
            const data = await CategoryModel.findOneAndUpdate({userId} , {$set : {category : category , budget_boundry : budget_boundry}} , {new:true})

            res.json({
                success : true,
                message : "Category Updated Successfully!!",
                data
            })
            
        } catch (error) {
            res.json({
                success : false,
                message : "Error in Category Updatation!!",
            })
            console.log(error);
            
        }
}


