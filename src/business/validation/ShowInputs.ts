import { RegisterShowDTO } from "../../model/Types";
import { CustomError } from "../errors/custonError";

export class showInputsValidation  {
    register(input:RegisterShowDTO) {
        this.token(input.token)
        this.id(input.id)
        this.week_day(input.week_day)
        this.starShowTime(input.start_time)
        this.endShowTime(input.end_time)
    }


    private week_day = (week_day:string) => {
        // const invertedDate = date.split('/').reverse().join('-')
        // const enventDay = new Date(invertedDate).toString().slice(0,3)
        // if(enventDay !== 'Fri' && enventDay !== 'Sat' && enventDay !== 'Sun'){
        //     throw new CustomError(422,'O dia do Show precisa ser SEXTA, SÁBADO, ou DOMINGO')
        // }
        if(week_day !== 'SEXTA' && week_day !== 'SABADO' && week_day !== 'SÁBADO' && week_day !== 'DOMINGO'){
            throw new CustomError(422,'O dia do show precisa ser SEXTA, SÁBADO, ou DOMINGO')
        }
    }

    private starShowTime = (startTime:number) => {
        if(!Number.isInteger(startTime)) {
            throw new CustomError(422, 'Hora de início do show inválida')
        }
        if(startTime < 8 || startTime > 23) {
            throw new CustomError(422, 'Shows só podem ser marcados das 8h as 23h')
        }
    }

    private endShowTime = (endTime:number) => {
        if(!Number.isInteger(endTime)) {
            throw new CustomError(422, 'Hora de Término do show inválida')
        }
    }

    private id = (id:string) => {
        if(!id) {
            throw new CustomError(422,'Não foi passado um id')
        }
    }
    private token = (token:string) => {
        if(!token) {
            throw new CustomError(401,'Token inválido')
        }
    }
}