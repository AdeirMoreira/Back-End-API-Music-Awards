import { UserBusiness } from "../src/business/UserBusiness"
import { UserDatabase } from "../src/data/UserData"
import { USER_ROLES } from "../src/model/User"
import { AuthenticatorMock } from "./mock/AuthenticatorMock"
import { HashMockGenerator } from "./mock/HashGeneretorMock"
import { IdGeneratorMock } from "./mock/IdGeneratorMock"
import { UserDatabaseMock } from "./mock/User/UserDatabaseMock"


const userBusinessMock = new UserBusiness(
    new IdGeneratorMock(),
    new HashMockGenerator(),
    new AuthenticatorMock(),
    new UserDatabaseMock() as UserDatabase
)

describe("Testando o signup", () => {
    test("Erro de nome", async () => {
        try {
            await userBusinessMock.signup("", "mariana@dev.com", "123456", USER_ROLES.NORMAL)
        } catch(error: any) {
            expect(error.message).toEqual("Missing input")
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Erro de email", async () => {
        try {
            await userBusinessMock.signup("Mariana", "marianadev.com", "123456", USER_ROLES.NORMAL)
        } catch(error: any) {
            expect(error.message).toEqual("Invalid email")
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Error de senha", async () => {
        try {
            await userBusinessMock.signup("Mariana", "mariana@dev.com", "12345", USER_ROLES.NORMAL)
        } catch(error: any) {
            expect(error.message).toEqual("Invalid password")
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Erro de role", async () => {
        try {
            await userBusinessMock.signup("Mariana", "mariana@dev.com", "123456", "batata")
        } catch(error: any) {
            expect(error.message).toEqual("Invalid user role")
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Sucesso no cadastro", async () => {
        try {
            const {token} = await userBusinessMock.signup("Mariana", "Mariana@dev.com", "123456", USER_ROLES.NORMAL)
            expect(token).toEqual("token")
        } catch(error: any) {
            console.log(error)
        } finally {
            expect.assertions(1)
        }
    })
})


describe("Testando o login", () => {
    test("Error de email", async () => {
        try {
            await userBusinessMock.login("batata@dev.com", "123456")
        } catch(error: any) {
            // console.log(error)
            expect(error.message).toEqual("Invalid credentials")
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })

    test("Error de senha", async () => {
        try {
            await userBusinessMock.login("mariana@dev.com", "123457")
        } catch(error: any) {
            // console.log(error)
            expect(error.message).toEqual("Invalid credentials")
            expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(2)
        }
    })


    test("Sucesso no login", async () => {
        try {
            const {token} = await userBusinessMock.login("mayara@dev.com", "123456")
            expect(token).toEqual("token")

        } catch(error: any) {
            console.log(error)
            // expect(error.message).toEqual("Invalid credentials")
            // expect(error.statusCode).toBe(401)
        } finally {
            expect.assertions(1)
        }
    })
})