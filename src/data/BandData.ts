import { CustomError } from "../business/errors/CustomError";
import Band, { FindByIdOrNameResponse } from "../model/Band";
import BaseDatabase from "./BaseDatabase";

export default class BandData extends BaseDatabase {
  protected TABLE_NAME = "lama_bands";

  insertBand = async (band: Band) => {
    try {
      await BandData.connection(this.TABLE_NAME).insert(band);
    } catch (error:any) {
        throw new CustomError(500, error.sqlMessage);
    }
  };
  selectByIdOrName = async (
    id: string,
    name: string
  ): Promise<FindByIdOrNameResponse> => {
    console.log(id)
    console.log(name)
    try {
      let result: FindByIdOrNameResponse[] = [];
      if (id) {
            result = await BandData.connection(this.TABLE_NAME)
          .select("*")
          .where("id", "=", id);
          
      } else {
            result = await BandData.connection(this.TABLE_NAME)
          .select("*")
          .where("name", "=", name);
      }

      const band: FindByIdOrNameResponse = {
        id: result[0].id,
        name: result[0].name,
        music_genre: result[0].music_genre,
        responsible: result[0].responsible,
      };
      return band;
    } catch (error:any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };
}
