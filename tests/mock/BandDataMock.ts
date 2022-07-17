import Band, { FindByIdOrNameResponse } from "../../src/model/Band";
import { band1, band2 } from "./BandMock";

export default class BandDataMock {

  insertBand = async (band: Band) => {};
  selectByIdOrName = async (
    id: string,
    name: string
  ): Promise<FindByIdOrNameResponse> => {
    console.log(id, name)
    if (id === "band1") {
      return band1;
    } else if(name === "band2") {
      return band2;
    }else{
      throw new Error(undefined)
    }
  };
}
