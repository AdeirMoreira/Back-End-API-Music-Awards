import { User } from "../../../src/model/User";
import { userAdminMock, userMock } from "./UserMock"

export class UserDatabaseMock {
    public async createUser(user: User): Promise<void> {

    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        switch(email) {
            case "mayara@dev.com":
                return userMock
            case "maria@dev.com":
                return userAdminMock
            default: 
                return undefined
        }
    }

    public async getUserById(id: string): Promise<User | undefined> {
        switch(id) {
            case "id_user_1":
                return userMock
            case "id_user_2":
                return userAdminMock
            default: 
                return undefined
        }
    }

    public async getAllUsers(): Promise<User[]> {
        return [userMock, userAdminMock]
    }
}  