import { Router } from "express";
import  showController  from "../../controller/ShowController";

export const showRouter = Router()

//Injeção de dependências

showRouter.post("/register", showController.register)
showRouter.get("/:weekDay", showController.showsDay)