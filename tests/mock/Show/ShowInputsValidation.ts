import { CustomError } from "../../../src/business/errors/CustomError";
import { RegisterShowDTO, ShowsDayDTO, WEEK_DAY } from "../../../src/model/Types";

export class showInputsValidationMock {
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


    private week_day = (week_day:string) => {}

    private starShowTime = (startTime:number,endTime:number) => {}

    private endShowTime = (endTime:number) => {}

    private bandId = (band_id:string) => {}

    private token = (token:string) => {}
}