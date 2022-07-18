import { InputCreateBandDTO, InputSelectBandDTO } from "../../model/Band";
import { CustomError } from "../errors/CustomError";

export class BandInputsValidation {
    createBand(input: InputCreateBandDTO) {
        this.name(input.name)
        this.music_genre(input.music_genre)
        this.responsible(input.responsible)
        this.token(input.token)
    }
    selectBand(input: InputSelectBandDTO){
        this.idOrName(input.id, input.name)
        this.token(input.token)

    }
    private name = (name:string)=>{
        if (!name) {
            throw new CustomError(422, "Nome inválido");
        }
    }
    private music_genre = (music_genre:string) =>{
        if (!music_genre) {
            throw new CustomError(422, "Gênero inválido");
        }
    }
    private responsible = (responsible:string) => {
        if (!responsible) {
            throw new CustomError(422, "Responsável inválido");
        }
    }
    private token = (token:string | undefined) => {
        if (!token) {
            throw new CustomError(409, "Token inválido");
        }
    }
    private idOrName = (id:string, name:string) => {
        if(!id && !name){
            throw new CustomError(422, "Não foi passado um termo para a busca");
        }
    } 

}   
