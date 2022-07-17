import { CustomError } from "../../src/business/errors/CustomError";
import { USER_ROLES } from "../../src/model/User";


export type AuthenticationData = {
    id:string,
    role:USER_ROLES
    }

export class AuthenticatorMock {
    public generate(input: AuthenticationData): string {
        return 'token';
    }


    public getTokenData(token: string): AuthenticationData {
        if(!token){
            throw new Error("jwt")
        }
        let data = {}
        if(token.includes("NORMAL")){
            data = {id:'id', role:USER_ROLES.NORMAL};
        }else{
            data = {id:'id', role:USER_ROLES.ADMIN}
        }
        return data as AuthenticationData;
    }
}