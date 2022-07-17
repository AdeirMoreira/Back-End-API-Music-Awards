import { BandBusiness } from "../src/business/BandBusiness";
import BandData from "../src/data/BandData";
import { InputCreateBandDTO, InputSelectBandDTO } from "../src/model/Band";
import { Authenticator } from "../src/services/Authenticator";
import { AuthenticatorMock } from "./mock/AuthenticatorMock";
import BandDataMock from "./mock/BandDataMock";
import { band1, band2, band3 } from "./mock/BandMock";
import { IdGeneratorMock } from "./mock/IdGeneratorMock";

const bandBusinessMock = new BandBusiness(
  new BandDataMock() as BandData,
  new IdGeneratorMock(),
  new AuthenticatorMock()
);


describe("testing class bandBusiness.createBand", () => {
  test("test missing name", async () => {
    const input: InputCreateBandDTO = {
      name: "",
      music_genre: "rock",
      responsible: "Zeca Pagordinho",
      token: "3642",
    };
    try {
      await bandBusinessMock.createBand(input);
    } catch (error: any) {
      expect(error.statusCode).toEqual(422);
      expect(error.message).toEqual("Invalid Fields");
    } finally {
      expect.assertions(2);
    }
  });
  test("test missing music_genre", async () => {
    const input: InputCreateBandDTO = {
      name: "Michael Jackson",
      music_genre: "",
      responsible: "Zeca Pagordinho",
      token: "3642",
    };
    try {
      await bandBusinessMock.createBand(input);
    } catch (error: any) {
      expect(error.statusCode).toEqual(422);
      expect(error.message).toEqual("Invalid Fields");
    } finally {
      expect.assertions(2);
    }
  });
  test("test missing responsible", async () => {
    const input: InputCreateBandDTO = {
      name: "Michael Jackson",
      music_genre: "Rock",
      responsible: "",
      token: "3642",
    };
    try {
      await bandBusinessMock.createBand(input);
    } catch (error: any) {
      expect(error.statusCode).toEqual(422);
      expect(error.message).toEqual("Invalid Fields");
    } finally {
      expect.assertions(2);
    }
  });
  test("test missing token", async () => {
    const input: InputCreateBandDTO = {
      name: "Michael Jackson",
      music_genre: "Rock",
      responsible: "Irineu",
      token: "",
    };
    try {
      await bandBusinessMock.createBand(input);
    } catch (error: any) {
      expect(error.statusCode).toEqual(409);
      expect(error.message).toEqual("Invalid Token");
    } finally {
      expect.assertions(2);
    }
  });
  test("test if NORMAL user can register newBands", async () => {
    const input: InputCreateBandDTO = {
      name: "Michael Jackson",
      music_genre: "Rock",
      responsible: "Irineu",
      token: "TOKEN NORMAL"
    };
    try {
      await bandBusinessMock.createBand(input);
    } catch (error: any) {
      expect(error.statusCode).toEqual(401);
      expect(error.message).toEqual("Only Admin Users Can Register New Bands");
    } finally {
      expect.assertions(2);
    }
  });
});

describe("testing class bandBusiness.selectByIdOrName", () => {
  test("test search band by id", async () => {
    const input: InputSelectBandDTO = {
      id: "id1",
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
      responsible: "Martinho da Vila"
    });
    expect.assertions(2);
  });
  test("test search band by name", async () => {
    const input: InputSelectBandDTO = {
      id: "",
      name: "Michael Jackson",
      token: "123",
    };
    const selectByName = jest.fn((input: InputSelectBandDTO) =>
      bandBusinessMock.selectBand(input)
    );
    const result = await selectByName(input);
    expect(selectByName).toHaveBeenCalledWith(input);
    expect(result).toEqual({
      id:"id2",
      name:"Guns n Roses",
      music_genre:"Rock",
      responsible:"Zeca Pagordinho"
    });
    expect.assertions(2);
  });
});

