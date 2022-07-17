import BandData from "../data/BandData";
import Band, { InputCreateBandDTO, InputSelectBandDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";
import { UserRole } from "../model/User";

export class BandBusiness {
  constructor(
    private bandData: BandData,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}
  createBand = async (input: InputCreateBandDTO) => {
    try {
      const { name, music_genre, responsible, token } = input;
      if (!name || !music_genre || !responsible) {
        throw new CustomError( 422, "Invalid Fields");
      }
      if(!token){
        throw new CustomError(409, "Invalid Token")
      }
      const id = this.idGenerator.generateId();
      const tokenData = this.authenticator.getTokenData(input.token);
      if(tokenData.role === UserRole.NORMAL){
        throw new CustomError(401, "Only Admin Users Can Register New Bands")
      }
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

export default new BandBusiness(
  new BandData(),
  new IdGenerator(),
  new Authenticator()
  )
