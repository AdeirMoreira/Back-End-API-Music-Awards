import { ShowDataBase } from "../data/ShowData";
import { CustomError } from "./errors/CustomError";
import { Show } from "../model/Show";
import { RegisterShowDTO, ShowsDayDTO } from "../model/Types"
import { Authenticator } from "../services/Authenticator"
import IdGenerator from "../services/IdGenerator"
import { showInputsValidation } from "./validation/ShowInputs"



export class ShowBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private showDataBase : ShowDataBase,
        private dataValidation: showInputsValidation,
    ) {}

    public async register(input:RegisterShowDTO) {
        try {
        const {token,week_day,start_time,end_time,band_id} = input

        this.dataValidation.register(input)

        this.authenticator.getTokenData(token)

        const shows = await this.showDataBase.getAll()
        const busyTime = shows.find(
            (show:Show) => show.getWeak_day() === week_day.toUpperCase() && 
                (
                    (start_time >= show.getStart_time() && start_time < show.getEnd_Time()) || 
                    (end_time > show.getStart_time() && end_time <= show.getEnd_Time()) || 
                    (start_time < show.getStart_time() && end_time > show.getEnd_Time())
                )
        )

        if(busyTime) {
            throw new CustomError(
                409, `Já há um show programado para o horário das ${busyTime.getStart_time()} as ${busyTime.getEnd_Time()}`
            )
        }

        const id = this.idGenerator.generateId()

        const show = new Show(id,week_day.toUpperCase(),start_time,end_time,band_id)

        return  await this.showDataBase.insert(show)
        } catch (error:any) {
            if(error.message.includes('jwt')){
                throw new CustomError(401,'Token inválido!')
            }
            throw new CustomError(error.statusCode, error.message);
        }
    }

    public async showsOfTheDay(inputs:ShowsDayDTO) {
        try {
            this.dataValidation.dayShows(inputs)

            this.authenticator.getTokenData(inputs.token)

            return this.showDataBase.getByDay(inputs.week_day)
        } catch (error:any) {
            if(error.message.includes('jwt')){
                throw new CustomError(401,'Token inválido!')
            }
            throw new CustomError(error.statusCode, error.message);
        }
    }
}

export default new ShowBusiness(
    new IdGenerator(),
    new Authenticator(),
    new ShowDataBase(),
    new showInputsValidation()
)