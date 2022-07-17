import { Router } from "express";
import bandController from "../../controller/BandController";

export const bandRouter = Router();

bandRouter.post("/create", bandController.createBand);
bandRouter.get("", bandController.selectBand);