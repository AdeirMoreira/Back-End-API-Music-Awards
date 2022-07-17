import { Request, Response } from "express";
import bandBusiness, {BandBusiness} from "../business/BandBusiness";
import { CustomError } from "../business/errors/CustomError";
import { InputCreateBandDTO, InputSelectBandDTO } from "../model/Band";

export class BandController {
  constructor(
    private bandBusiness: BandBusiness
    ) {}
  createBand = async (req: Request, res: Response) => {
    const input: InputCreateBandDTO = {
      name: req.body.name,
      music_genre: req.body.music_genre,
      responsible: req.body.responsible,
      token: req.headers.authorization,
    };
    try {
      await this.bandBusiness.createBand(input);
      res.status(201).send({ message: "Banda criada com sucesso" });
    } catch (error:any) {
        res.status(error.statusCode || 400).send({error:error.message})
    }
  };
  selectBand = async (req:Request, res:Response)=>{
    const input:InputSelectBandDTO = {
        id: req.query.id as string || "",
        name:req.query.name as string || "",
        token: req.headers.authorization
    }
    try {
        const band = await this.bandBusiness.selectBand(input)
        res.status(200).send(band)
    } catch (error:any) {
        res.status(error.statusCode || 400).send({error:error.message})       
    }
  }
}

export default new BandController(bandBusiness)
