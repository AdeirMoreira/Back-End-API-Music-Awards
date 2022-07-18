import { CustomError } from "../../../src/business/errors/CustomError"
import { InputCreateBandDTO, InputSelectBandDTO } from "../../../src/model/Band"


export class BandInputsValidationMock {
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
 
    }
    private music_genre = (music_genre:string) =>{

    }
    private responsible = (responsible:string) => {

    }
    private token = (token:string | undefined) => {

    }
    private idOrName = (id:string, name:string) => {

    } 

}   
