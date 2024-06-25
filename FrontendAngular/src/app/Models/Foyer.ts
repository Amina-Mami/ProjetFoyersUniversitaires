import { Universite } from '../Models/Universite';
export class Foyer {
  constructor(
    public idFoyer?: number,

    public nomFoyer?: string,
    public capaciteFoyer?: number,
    public universite?: Universite
  ) {}
}
