import {ShowBusiness} from "../src/business/ShowBusiness"
import { showInputsValidation } from "../src/business/validation/ShowInputs"
import { RegisterShowDTO } from "../src/model/Types"
import { AuthenticatorMock } from "./mock/AuthenticatorMock"
import { IdGeneratorMock } from "./mock/idGeneratorMock"
import { ShowDataBaseMock } from "./mock/ShowDataMock"
import { showInputsValidationMock } from "./mock/ShowInputsValidation"


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
            expect(error.statusCode).toEqual(401)
        } finally {
            expect.assertions(2)
        }
    })
    test('test miss week_dat', () => {
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
    test('test other week_dat', () => {
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
    test('test show Start and End inválid', () => {
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
})

// const ShowBussinessMock = new ShowBusiness(
//     new IdGeneratorMock(),
//     new AuthenticatorMock(),
//     new ShowDataBaseMock(),
//     new showInputsValidationMock()
// )

// describe('Testing class ShowBussiness', () => {
//     test('', => {

//     })
// })