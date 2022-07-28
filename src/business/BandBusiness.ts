import BandData from "../data/BandData";
import Band, { InputCreateBandDTO, InputSelectBandDTO } from "../model/Band";
import { USER_ROLES } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "../model/errors/CustomError";
import { BandInputsValidation } from "./validation/BandInputs";

export class BandBusiness {
  constructor(
    private bandData: BandData,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private bandInputsValidation: BandInputsValidation
  ) {}

  createBand = async (input: InputCreateBandDTO) => {
    try {
      const { name, music_genre, responsible, token } = input;
      
      this.bandInputsValidation.createBand(input);

      const band = await this.bandData.selectByIdOrName('',name)
      if(band.name){
        throw new CustomError(
          409,
          "Essa banda já foi registrada!"
        );
      }
      
      const tokenData = this.authenticator.getTokenData(token);

      if (tokenData.role === USER_ROLES.NORMAL) {
        throw new CustomError(
          401,
          "Somente usuários administradores podem registrar novas bandas"
        );
      }

      const id = this.idGenerator.generateId();

      const newBand = new Band(id, name, music_genre, responsible);
      await this.bandData.insertBand(newBand);
    } catch (error: any) {
      if (error.message.includes("jwt")) {
        throw new CustomError(401, "Token inválido!");
      }
      throw new CustomError(error.statusCode, error.message);
    }
  };

  selectBand = async (input: InputSelectBandDTO) => {
    try {
      const { id, name, token } = input;

      this.bandInputsValidation.selectBand(input);

      this.authenticator.getTokenData(token);

      const result = await this.bandData.selectByIdOrName(id, name);
      if (!result.id) {
        throw new CustomError(404, "Banda não encontrada")
      }
      return result
    } catch (error: any) {
      if (error.message.includes("jwt")) {
        throw new CustomError(401, "Token inválido!");
      }
      throw new CustomError(error.statusCode, error.message);
    }
  };
}

export default new BandBusiness(
  new BandData(),
  new IdGenerator(),
  new Authenticator(),
  new BandInputsValidation()
);
