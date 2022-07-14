import { Show } from "../model/Show";
import { DBShow } from "../model/Types";
import BaseDatabase from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase {

    private toModel(dbModel?: any): Show | undefined {
    return ( dbModel && new Show(
            dbModel.id,
            dbModel.week_day,
            dbModel.start_time,
            dbModel.end_time
            )
        )
    }

    public async getAll() {
        try {
            const result = await BaseDatabase.connection('lama_show').select('*')
            return result.map((res:any) => {
                return this.toModel(res)
            })
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
        
    }

    public async getByDay(week_day:string):Promise<DBShow[]> {
        try {
            const result = await BaseDatabase.connection('lama_show')
            .select('lama_bands.name as Nome da Banda', 'lama.bands.music_genre as género')
            .join('lama_bands','lama_bands.id', '=' ,'lama_show.band_id')
            .where(week_day)
            return result.map((res:DBShow)=> {
                return {name:res.name,genre:res.genre}
            })
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}