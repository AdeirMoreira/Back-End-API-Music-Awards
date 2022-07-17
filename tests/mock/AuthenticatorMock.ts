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
        if(token.includes("NORMAL")){
            data = {id:'id', role:UserRole.NORMAL};
        }else{
            data = {id:'id', role:UserRole.ADMIN}
        }
        return data as AuthenticationData;
    }
}