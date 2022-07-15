import { Show } from "../model/Show";
import { DBShow } from "../model/Types";
import BaseDatabase from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase {

    private toModel(dbModel?: any): Show {
    return ( dbModel && new Show(
            dbModel.id,
            dbModel.week_day,
            dbModel.start_time,
            dbModel.end_time,
            dbModel.band_id
            )
        )
    }

    public async insert(show:Show) {
        try {
            await BaseDatabase.connection('lama_shows').insert({
                id: show.getId(), 
                week_day:show.getWeak_day(), 
                start_time:show.getStart_time(), 
                end_time:show.getEnd_Time(),
                band_id:show.getBand_Id()
            })
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getAll():Promise<Show[] | []> {
        try {
            const result = await BaseDatabase.connection('lama_shows').select('*')
            return result.map((res:Show) => {
                return this.toModel(res)
            })
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
        
    }

    public async getByDay(week_day:string):Promise<DBShow[] | []> {
        try {
            const result = await BaseDatabase.connection('lama_shows')
            .select('lama_bands.name as Nome_da_Banda', 'lama_bands.music_genre as género',
            'lama_shows.start_time as Início', 'lama_shows.end_time as Término')
            .join('lama_bands','lama_bands.id', '=' ,'lama_shows.band_id')
            .where({week_day})
            return result.map((res:DBShow)=> {
                return {Nome_da_Banda:res.Nome_da_Banda, género:res.género, Início:res.Início, Término:res.Término}
            }).sort((a,b)=> a.Início - b.Início)
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}