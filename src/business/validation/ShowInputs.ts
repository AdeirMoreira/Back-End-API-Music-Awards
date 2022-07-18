import { RegisterShowDTO, ShowsDayDTO, WEEK_DAY } from "../../model/Types";
import { CustomError } from "../errors/CustomError";


export class showInputsValidation  {
    register(input:RegisterShowDTO) {
        this.token(input.token)
        this.week_day(input.week_day.toUpperCase())
        this.starShowTime(input.start_time,input.end_time)
        this.endShowTime(input.end_time)
        this.bandId(input.band_id)
    }

    dayShows = (input:ShowsDayDTO) => {
        this.token(input.token)
        this.week_day(input.week_day.toUpperCase())
    }


    private week_day = (week_day:string) => {
        // const invertedDate = date.split('/').reverse().join('-')
        // const enventDay = new Date(invertedDate).toString().slice(0,3)
        // if(enventDay !== 'Fri' && enventDay !== 'Sat' && enventDay !== 'Sun'){
        //     throw new CustomError(422,'O dia do Show precisa ser SEXTA, SÁBADO, ou DOMINGO')
        // }
        if(!(week_day in WEEK_DAY)){
            throw new CustomError(422,'O dia do show precisa ser SEXTA, SÁBADO, ou DOMINGO')
        }
    }

    private starShowTime = (startTime:number,endTime:number) => {
        if(!Number.isInteger(startTime)) {
            throw new CustomError(422, 'Hora de início do show inválida!')
        }
        if(startTime >= endTime) {
            throw new CustomError(422, 'Duração do show inválida')
        }
        if(startTime < 8 || startTime > 23) {
            throw new CustomError(422, 'Shows só podem ser marcados das 8h as 23h!')
        }
    }

    private endShowTime = (endTime:number) => {
        if(!Number.isInteger(endTime)) {
            throw new CustomError(422, 'Hora de Término do show inválida!')
        }
        if(endTime < 9 || endTime > 23){
            throw new CustomError(422, 'Shows só podem ser marcados das 8h as 23h!')
        }
        
    }

    private bandId = (band_id:string) => {
        if(!band_id) {
            throw new CustomError(422,'O id da banda não foi passado!')
        }
    }

    private token = (token:string) => {
        if(!token) {
            throw new CustomError(401,'Token inválido!')
        }
    }
}