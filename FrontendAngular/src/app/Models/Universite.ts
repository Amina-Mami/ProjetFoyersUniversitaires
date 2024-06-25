import { Foyer } from './Foyer';

export class Universite {
  constructor(
    public idUniversite?: number,
    public nomUniversite?: string,
    public adresse?: string,
    public foyer?: Foyer
  ) {}
}
