import BaseDatabase from "../../../src/data/BaseDatabase"
import { DBShowMock1, DBShowMock2 } from "../../../src/model/DBShowMock"
import { Show } from "../../../src/model/Show"
import { DBShow } from "../../../src/model/Types"
import { showMock1, showMock2 } from "./ShowsMocs"


export class ShowDataBaseMock extends BaseDatabase{
    // private toModel(dbModel?: any): Show {
    //     return ( dbModel && new Show(
    //             dbModel.id,
    //             dbModel.week_day,
    //             dbModel.start_time,
    //             dbModel.end_time,
    //             dbModel.band_id
    //             )
    //         )
    //     }

    public async insert(show:Show):Promise<void> {}

    public async getAll():Promise<Show[] | []> {
        return [showMock1,showMock2]
    }

    public async getByDay(week_day:string):Promise<DBShow[] | []> {
        return [DBShowMock1,DBShowMock2]
    }
}