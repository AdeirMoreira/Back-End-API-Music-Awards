export class Show {
    constructor(
        private id:string, 
        private week_day:string, 
        private start_time:number, 
        private end_time:number,
        private band_id:string
    ){}
    
    getId = () => this.id
    getWeak_day = () => this.week_day
    getStart_time = () => this.start_time
    getEnd_Time = () => this.end_time
    getBand_Id = () => this.band_id
}

export interface showInterface {
    id:string, 
    week_day:string, 
    start_time:number, 
    end_time:number,
    band_id:string
}
