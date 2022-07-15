export type RegisterShowDTO = {
    token:string,
    week_day:string,
    start_time: number,
    end_time: number,
    band_id: string
}

export type ShowsDayDTO = {
    token:string,
    week_day:string
}

export type DBShow = {
    Nome_da_Banda:string,
    género:string,
    Início:number,
    Término:number
}

export enum WEEK_DAY {
    SEXTA = 'SEXTA',
    SÁBADO = 'SABADO',
    DOMINGO = 'DOMINGO'
}