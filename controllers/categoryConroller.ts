import { Request, Response } from "express";
import CategoryModel from "../models/categoryModel";
import { ReadableStreamDefaultController } from "node:stream/web";


export const createCategory = async(req : Request , res: Response) : Promise<void>=>{
    try {
        const {category , budget_boundry} = req.body;
        if(!(category || budget_boundry)){
             res.json("field is required!!")
             return
        }

        const existingCategory = await CategoryModel.findOne({category})
        if(existingCategory){
            res.json("category is already there!!!")
            ReadableStreamDefaultController
        }

        const newCategory = await new CategoryModel({
            category,
            budget_boundry
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
        const getCategory =  await CategoryModel.find({});
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
        const data = await CategoryModel.find({})
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




export const getBudgeBoundryController = async(req : Request , res: Response) : Promise<void>=>{
    try {
        
    } catch (error) {
        
    }
}