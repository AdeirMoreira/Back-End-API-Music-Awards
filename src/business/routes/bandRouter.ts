import { Router } from "express";
import BandController from "../../controller/BandController";
import BandData from "../../data/BandData";
import { Authenticator } from "../../services/Authenticator";
import IdGenerator from "../../services/IdGenerator";
import BandBusiness from "../BandBusiness";

export const bandRouter = Router();

const bandController = new BandController(
    new BandBusiness(
    new BandData(),
    new IdGenerator(),
    new Authenticator()
    )
);

bandRouter.post("/create", bandController.createBand);
bandRouter.get("", bandController.selectBand);