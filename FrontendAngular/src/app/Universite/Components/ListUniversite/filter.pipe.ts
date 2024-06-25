import { Pipe, PipeTransform } from '@angular/core';
import { Universite } from 'src/app/Models/Universite';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(universites: Universite[], recherche: string): Universite[] {
    if (!universites) {
      return [];
    }
    if (!recherche) {
      return universites;
    }
    recherche = recherche.toLowerCase();
    return universites.filter(universite => {
      // Convert idUniversite to string and apply includes
      const idUniversiteString = universite.idUniversite.toString();
      
      return (
        idUniversiteString.includes(recherche) ||
        universite.nomUniversite.toLowerCase().includes(recherche) ||
        universite.adresse.toLowerCase().includes(recherche) 
      );
    });
  }
}