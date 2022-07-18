import { User, USER_ROLES } from "../../../src/model/User";

export const userMock = new User(
    "id_user_1",
    "mayara",
    "mayara@dev.com",
    "123456",
    USER_ROLES.NORMAL
)

export const userAdminMock = new User(
    "id_user_2",
    "maria",
    "maria@dev.com",
    "123456",
    USER_ROLES.ADMIN
)   