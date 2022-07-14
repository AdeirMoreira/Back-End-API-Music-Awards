import { ShowDataBase } from "../data/ShowData";
import { RegisterShowDTO } from "../model/Types";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";
import { showInputsValidation } from "./validation/showInputs";


export class ShowBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private showDataBase : ShowDataBase,
        private dataValidation: showInputsValidation,
    ) {}

    public async register(input:RegisterShowDTO) {
        this.dataValidation.register(input)

        // const tokenData = this.authenticator.getTokenData(input.token)

        return  await this.showDataBase.getAll()

    }
}

export default new ShowBusiness(
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new ShowDataBase(),
    new showInputsValidation()
)