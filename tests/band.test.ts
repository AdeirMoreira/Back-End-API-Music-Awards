import { BandBusiness } from "../src/business/BandBusiness";
import { BandInputsValidation } from "../src/business/validation/BandInputs";
import BandData from "../src/data/BandData";
import { InputCreateBandDTO, InputSelectBandDTO } from "../src/model/Band";
import { AuthenticatorMock } from "./mock/AuthenticatorMock";
import BandDataMock from "./mock/Band/BandDataMock";
import { BandInputsValidationMock } from "./mock/Band/BandInputsValidationMocks";
import { IdGeneratorMock } from "./mock/IdGeneratorMock";

const bandBusinessMock = new BandBusiness(
  new BandDataMock() as BandData,
  new IdGeneratorMock(),
  new AuthenticatorMock(),
  new BandInputsValidationMock() as unknown as BandInputsValidation
);

const bandInputsValidationMock = new BandInputsValidation();

describe("testing class bandInputsValidation", () => {
  describe("testing createBand", () => {
    test("test missing name", () => {
      const input: InputCreateBandDTO = {
        name: "",
        music_genre: "rock",
        responsible: "Zeca Pagordinho",
        token: "3642",
      };
      try {
        bandInputsValidationMock.createBand(input);
      } catch (error: any) {
        expect(error.statusCode).toEqual(422);
        expect(error.message).toEqual("Nome inválido");
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing music_genre", () => {
      const input: InputCreateBandDTO = {
        name: "Michael Jackson",
        music_genre: "",
        responsible: "Zeca Pagordinho",
        token: "3642",
      };
      try {
        bandInputsValidationMock.createBand(input);
      } catch (error: any) {
        expect(error.statusCode).toEqual(422);
        expect(error.message).toEqual("Gênero inválido");
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing responsible", () => {
      const input: InputCreateBandDTO = {
        name: "Michael Jackson",
        music_genre: "Rock",
        responsible: "",
        token: "3642",
      };
      try {
        bandInputsValidationMock.createBand(input);
      } catch (error: any) {
        expect(error.statusCode).toEqual(422);
        expect(error.message).toEqual("Responsável inválido");
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing token", () => {
      const input: InputCreateBandDTO = {
        name: "Michael Jackson",
        music_genre: "Rock",
        responsible: "Irineu",
        token: "",
      };
      try {
        bandInputsValidationMock.createBand(input);
      } catch (error: any) {
        expect(error.statusCode).toEqual(409);
        expect(error.message).toEqual("Token inválido");
      } finally {
        expect.assertions(2);
      }
    });
  });
  describe("test selectBand", () => {
    test("missing id and name", () => {
      const id = "";
      const name = "";
      const token = "123abc";
      try {
        bandInputsValidationMock.selectBand({ id, name, token });
      } catch (error: any) {
        expect(error.statusCode).toEqual(422);
        expect(error.message).toEqual("Não foi passado um termo para a busca");
      } finally {
        expect.assertions(2);
      }
    });
    test("test missing token", () => {
      const input: InputSelectBandDTO = {
        id: "id1",
        name: "juvenal",
        token: "",
      };
      try {
        bandInputsValidationMock.selectBand(input);
      } catch (error: any) {
        expect(error.statusCode).toEqual(409);
        expect(error.message).toEqual("Token inválido");
      } finally {
        expect.assertions(2);
      }
    });
  });
});
describe("test class bandBusiness", () => {
  describe("test createBand", () => {
    test("test if NORMAL user can register newBands", async () => {
      const input: InputCreateBandDTO = {
        name: "Michael Jackson",
        music_genre: "Rock",
        responsible: "Irineu",
        token: "NORMAL",
      };
      try {
        await bandBusinessMock.createBand(input);
      } catch (error: any) {
        expect(error.statusCode).toEqual(401);
        expect(error.message).toEqual(
          "Somente usuários administradores podem registrar novas bandas"
        );
      } finally {
        expect.assertions(2);
      }
    });
    test("test invalid token", async () => {
      const input: InputCreateBandDTO = {
        name: "Michael Jackson",
        music_genre: "Rock",
        responsible: "Irineu",
        token: "",
      };
      try {
        await bandBusinessMock.createBand(input);
      } catch (error: any) {
        expect(error.statusCode).toEqual(401);
        expect(error.message).toEqual("Token inválido!");
      } finally {
        expect.assertions(2);
      }
    });
  });
  describe("testing selectByIdOrName", () => {
    test("test search band by id", async () => {
      const input: InputSelectBandDTO = {
        id: "band1",
        name: "",
        token: "123",
      };
      const selectById = jest.fn((input: InputSelectBandDTO) =>
        bandBusinessMock.selectBand(input)
      );
      const result = await selectById(input);
      expect(selectById).toHaveBeenCalledWith(input);
      expect(result).toEqual({
        id: "id1",
        name: "Michael Jackson",
        music_genre: "POP",
        responsible: "Martinho da Vila",
      });
      expect.assertions(2);
    });
    test("test search band by name", async () => {
      const input: InputSelectBandDTO = {
        id: "",
        name: "band2",
        token: "123",
      };
      const selectByName = jest.fn((input: InputSelectBandDTO) =>
        bandBusinessMock.selectBand(input)
      );
      const result = await selectByName(input);
      expect(selectByName).toHaveBeenCalledWith(input);
      expect(result).toEqual({
        id: "id2",
        name: "Guns n Roses",
        music_genre: "Rock",
        responsible: "Zeca Pagordinho",
      });
      expect.assertions(2);
    });
    test("test if band not found", async () => {
      const input: InputSelectBandDTO = {
        id: "",
        name: "band3",
        token: "123",
      };
  
      try {
        const selectByIdorName = jest.fn((input: InputSelectBandDTO) =>
          bandBusinessMock.selectBand(input)
        );
        const result = await selectByIdorName(input);
      } catch (error:any) {
        expect(error.statusCode).toEqual(404);
        expect(error.message).toEqual("Banda não encontrada");
      } finally {
        expect.assertions(2);
      }
    });
    test("test invalid token", async () => {
      const input: InputCreateBandDTO = {
        name: "Michael Jackson",
        music_genre: "Rock",
        responsible: "Irineu",
        token: "",
      };
      try {
        await bandBusinessMock.createBand(input);
      } catch (error: any) {
        expect(error.statusCode).toEqual(401);
        expect(error.message).toEqual("Token inválido!");
      } finally {
        expect.assertions(2);
      }
    });
  });
});

