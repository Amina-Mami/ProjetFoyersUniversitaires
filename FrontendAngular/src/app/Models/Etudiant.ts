export class Etudiant {
  constructor(
    public idEtudiant?: number,
    public nomEtudiant?: string,
    public prenomEtudiant?: string,
    public ecole?: string,
    public cinEtudiant?: number,
    public dateNaissance?: Date
  ) {}
}
