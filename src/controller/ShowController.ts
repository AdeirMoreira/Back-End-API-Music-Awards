import { Request,Response } from "express"
import { RegisterShowDTO } from "../model/Types"
import showBusiness from "../business/ShowBusiness"

export class ShowController {
    public async register(req: Request, res: Response) {
        const token = req.headers.authorization as string
        const {id,week_day,start_time,end_time} = req.body
        try {
            const input:RegisterShowDTO = {token,id,week_day,start_time,end_time}
            showBusiness.register(input)
            res.status(200).send()
        } catch (error:any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }
    }
}