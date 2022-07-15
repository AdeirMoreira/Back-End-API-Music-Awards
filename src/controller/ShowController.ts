import { Request,Response } from "express"
import { RegisterShowDTO, ShowsDayDTO } from "../model/Types"
import showBusiness from "../business/ShowBusiness"

export class ShowController {
    public async register(req: Request, res: Response) {
        const token = req.headers.authorization as string
        const {week_day,start_time,end_time,band_id} = req.body
        try {
            const input:RegisterShowDTO = {token,week_day,start_time,end_time,band_id}
            await showBusiness.register(input)
            res.status(201).send()
        } catch (error:any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }
    }

    public async showsDay(req: Request, res: Response) {
        const token = req.headers.authorization as string
        const week_day = req.params.weekDay
        try {
            const inputs:ShowsDayDTO = {token,week_day}
            res.status(200).send(await showBusiness.showsOfTheDay(inputs))
        } catch (error:any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }
    }
}

export default new ShowController()