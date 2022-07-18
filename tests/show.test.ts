import {ShowBusiness} from "../src/business/ShowBusiness"
import { showInputsValidation } from "../src/business/validation/ShowInputs"
import { ShowDataBase } from "../src/data/ShowData"
import { RegisterShowDTO } from "../src/model/Types"
import { AuthenticatorMock } from "./mock/AuthenticatorMock"
import { IdGeneratorMock } from "./mock/IdGeneratorMock"
import { ShowDataBaseMock } from "./mock/Show/ShowDataMock"
import { showInputsValidationMock } from "./mock/Show/ShowInputsValidation"


const dataValidation = new showInputsValidation()

describe('testing class showInputsValidation ', () => {
    test('test miss token', () => {
        const inputs:RegisterShowDTO = {
            token:'',
            week_day:'sexta',
            start_time:8 ,
            end_time:9,
            band_id:'band_id'
        }
        try {
            dataValidation.register(inputs)
        } catch (error:any) {
            expect(error.message).toEqual('Token inválido!')
            expect(error.statusCode).toStrictEqual(401)
        } finally {
            expect.assertions(2)
        }
    })
    test('test miss week_day', () => {
        const inputs:RegisterShowDTO = {
            token:'token',
            week_day:'',
            start_time:8,
            end_time:9,
            band_id:'band_id'
        }
        try {
            dataValidation.register(inputs)
        } catch (error:any) {
            expect(error.message).toEqual('O dia do show precisa ser SEXTA, SÁBADO, ou DOMINGO')
            expect(error.statusCode).toEqual(422)
        } finally {
            expect.assertions(2)
        }
    })
    test('test other week_day', () => {
        const inputs:RegisterShowDTO = {
            token:'token',
            week_day:'quinta',
            start_time:8,
            end_time:9,
            band_id:'band_id'
        }
        try {
            dataValidation.register(inputs)
        } catch (error:any) {
            expect(error.message).toEqual('O dia do show precisa ser SEXTA, SÁBADO, ou DOMINGO')
            expect(error.statusCode).toEqual(422)
        } finally {
            expect.assertions(2)
        }
    })
    test('test Start show inválid', () => {
        const inputs:RegisterShowDTO = {
            token:'token',
            week_day:'sexta',
            start_time:7,
            end_time:9,
            band_id:'band_id'
        }
        try {
            dataValidation.register(inputs)
        } catch (error:any) {
            expect(error.message).toEqual('Shows só podem ser marcados das 8h as 23h!')
            expect(error.statusCode).toEqual(422)
        } finally {
            expect.assertions(2)
        }
    })
    test('test End Show inválid', () => {
        const inputs:RegisterShowDTO = {
            token:'token',
            week_day:'sexta',
            start_time:20,
            end_time:24,
            band_id:'band_id'
        }
        try {
            dataValidation.register(inputs)
        } catch (error:any) {
            expect(error.message).toEqual('Shows só podem ser marcados das 8h as 23h!')
            expect(error.statusCode).toEqual(422)
        } finally {
            expect.assertions(2)
        }
    })
    test('test start_Time not integer', () => {
        const inputs:RegisterShowDTO = {
            token:'token',
            week_day:'sábado',
            start_time:8.5,
            end_time:9,
            band_id:'band_id'
        }
        try {
            dataValidation.register(inputs)
        } catch (error:any) {
            expect(error.message).toEqual('Hora de início do show inválida!')
            expect(error.statusCode).toEqual(422)
        } finally {
            expect.assertions(2)
        }
    })
    test('test start_Time larger end_Time', () => {
        const inputs:RegisterShowDTO = {
            token:'token',
            week_day:'sexta',
            start_time:10,
            end_time:9,
            band_id:'band_id'
        }
        try {
            dataValidation.register(inputs)
        } catch (error:any) {
            expect(error.message).toEqual('Duração do show inválida')
            expect(error.statusCode).toEqual(422)
        } finally {
            expect.assertions(2)
        }
    })
    test('test end_Time not integer', () => {
        const inputs:RegisterShowDTO = {
            token:'token',
            week_day:'DOMINGO',
            start_time:8,
            end_time:9.5,
            band_id:'band_id'
        }
        try {
            dataValidation.register(inputs)
        } catch (error:any) {
            expect(error.message).toEqual('Hora de Término do show inválida!')
            expect(error.statusCode).toEqual(422)
        } finally {
            expect.assertions(2)
        }
    })
    test('test miss band_id', () => {
        const inputs:RegisterShowDTO = {
            token:'token',
            week_day:'SÁBADO',
            start_time:8,
            end_time:9,
            band_id:''
        }
        try {
            dataValidation.register(inputs)
        } catch (error:any) {
            expect(error.message).toEqual('O id da banda não foi passado!')
            expect(error.statusCode).toEqual(422)
        } finally {
            expect.assertions(2)
        }
    })
    test('test corret inputs', async () => {
        const inputs:RegisterShowDTO = {
            token:'token',
            week_day:'SÁBADO',
            start_time:8,
            end_time:10,
            band_id:'band_id'
        }
        try {
            const insert =  jest.fn(
                (input:RegisterShowDTO) => dataValidation.register(input)
            )
            const result = insert(inputs)
            expect(insert).toBeCalled()
            expect(insert).toBeCalledWith(inputs)
            expect(result).toBeUndefined()
            expect(insert).toHaveReturned()
            
        } catch (error:any) {
            console.log(error.message)
        } finally {
            expect.assertions(4)
        }
    })
})

const ShowBusinessMock = new ShowBusiness(
    new IdGeneratorMock(),
    new AuthenticatorMock(),
    new ShowDataBaseMock() as ShowDataBase,
    new showInputsValidationMock() as unknown as showInputsValidation
)

describe('Testing class ShowBussiness', () => {
    test('Testing busyTime on start_time', async ()=> {
        const input:RegisterShowDTO = {
            token:'token',
            week_day:'SÁBADO',
            start_time:17,
            end_time:20,
            band_id:'band_id'
        }
        try {
            await ShowBusinessMock.register(input)
        } catch (error:any) {
            expect(error.statusCode).toEqual(409)
            expect(error.message).toEqual('Já há um show programado para o horário das 15 as 18')
        }
        finally{
            expect.assertions(2)
        }
    })

    test('Testing busyTime on end_time', async ()=> {
        const input:RegisterShowDTO = {
            token:'token',
            week_day:'SÁBADO',
            start_time:20,
            end_time:17,
            band_id:'band_id'
        }
        try {
            await ShowBusinessMock.register(input)
        } catch (error:any) {
            expect(error.statusCode).toEqual(409)
            expect(error.message).toEqual('Já há um show programado para o horário das 15 as 18')
        }
        finally{
            expect.assertions(2)
        }
    })

    test('Testing showdata corret', async ()=> {
        const input:RegisterShowDTO = {
            token:'TOKEN',
            week_day:'SÁBADO',
            start_time:8,
            end_time:12,
            band_id:'BAND_ID'
        }
        try {
            const insert =  jest.fn(
                (input:RegisterShowDTO) => ShowBusinessMock.register(input)
            )
            await expect(insert(input)).resolves.not.toThrowError()
            await expect(insert(input)).resolves.toBeUndefined()
        } catch (error:any) {
            console.log(error.message)
        }finally{
            expect.assertions(2)
        }
    })
})