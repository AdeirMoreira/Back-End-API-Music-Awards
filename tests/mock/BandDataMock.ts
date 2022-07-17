import Band, { FindByIdOrNameResponse } from "../../src/model/Band";
import { band1, band2 } from "./BandMock";

export default class BandDataMock {

  insertBand = async (band: Band) => {};
  selectByIdOrName = async (
    id: string,
    name: string
  ): Promise<FindByIdOrNameResponse> => {
    if (id) {
      return band1;
    } else {
      return band2;
    }
  };
}
