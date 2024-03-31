import { Request, Response } from 'express'
import {LimitModel} from '../models/LimitModel';
// import {LimitModel} from '../models/LimitModel';
export const addLimitController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user
        const {income,daily_limit, month} = req.body;

        const data = new LimitModel({
            income , daily_limit ,month, userId
        })

        await data.save()

        res.json({
            success : true,
            message : "Limit added Successfully!!",
            data
        })

    } catch (error) {
        res.json({
            success : false,
            message : "error in adding limit of user!!",
            error
        })
    }
}


export const getLimitController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user
        
        const data = await LimitModel.find({userId})

        res.json({
            success : true,
            message : "Limit get Successfully!!",
            data
        })

    } catch (error) {
        res.json({
            success : false,
            message : "error in getting limit of user!!",
            error
        })
    }
}



export const updateLimitController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user
        const {income,daily_limit,month} = req.body;
        const data=await LimitModel.findOneAndUpdate({userId}, {$set:{income:income, daily_limit: daily_limit, month:month}}, {new: true})

        res.json({
            success : true,
            message : "Limit Updated Successfully!!",
            data
        })

    } catch (error) {
        console.log(error);
        
        res.json({
            success : false,
            message : "error in update the limit of user!!",
            error
        })
    }
}