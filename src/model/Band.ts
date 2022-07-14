export default class Band {
  constructor(
    private id: string,
    private name: string,
    private music_genre: string,
    private responsible: string
  ) {}
}
export interface InputCreateBandDTO {
  name: string;
  music_genre: string;
  responsible: string;
  token: string | undefined;
}
export interface InputSelectBandDTO {
  id: string;
  name: string;
  token: string | undefined;
}

export interface FindByIdOrNameResponse {
  id: string;
  name: string;
  music_genre: string;
  responsible: string;
}
