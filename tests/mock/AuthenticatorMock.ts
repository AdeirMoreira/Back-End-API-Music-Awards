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
        let data = {}
        console.log(token)
        if(token.includes("NORMAL")){
            data = {id:'id', role:USER_ROLES.NORMAL};
        }else{
            data = {id:'id', role:USER_ROLES.ADMIN}
        }
        return data as AuthenticationData;
    }
}