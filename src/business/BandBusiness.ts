import BandData from "../data/BandData";
import Band, { InputCreateBandDTO, InputSelectBandDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";

export default class BandBusiness {
  constructor(
    private bandData: BandData,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}
  createBand = async (input: InputCreateBandDTO) => {
    try {
      const { name, music_genre, responsible } = input;
      console.log(input)
      if (!name || !music_genre || !responsible) {
        throw new CustomError( 422, "Invalid Fields");
      }
      const id = this.idGenerator.generateId();
      const tokenData = this.authenticator.getTokenData(input.token);
      const band = new Band(id, name, music_genre, responsible);
      await this.bandData.insertBand(band);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  selectBand = async (input: InputSelectBandDTO) => {
    try {
      const tokenData = this.authenticator.getTokenData(input.token);
      const { id, name, token } = input;
      if ((!id && !name) || !token) {
        throw new CustomError(422, "Invalid Fields");
      }
      const band = await this.bandData.selectByIdOrName(id, name);
      if (!band) {
        throw new CustomError(404, "Band Not Found");
      }
      return band;
    } catch (error: any) {
        if(!error.message){
            throw new CustomError(404, "Band Not Found");
        }
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
