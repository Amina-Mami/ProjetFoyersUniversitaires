import { Foyer } from './Foyer';

export class Bloc {
  constructor(
    public idBloc?: number,
    public nomBloc?: String,
    public capaciteBloc?: number,
    public idFoyer?: number,
    public foyer?: Foyer
  ) {}
}
