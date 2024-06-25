import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../../Models/Etudiant';
import { EtudiantService } from '../../Services/etudiant.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etudiant-liste',
  templateUrl: './etudiant-liste.component.html',
  styleUrls: ['./etudiant-liste.component.css'],
})
export class EtudiantListeComponent implements OnInit {
  etudiants: Etudiant[] = [];
  searchTerm: string = '';

  constructor(
    private etudiantService: EtudiantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    console.log('Le composant a été initialisé !');
    this.getEtudiants();
  }
  public getEtudiants() {
    this.etudiantService.getEtudiantsList().subscribe(
      (data) => {
        this.etudiants = data.filter(
          (etudiant) =>
            (etudiant.nomEtudiant &&
              etudiant.nomEtudiant
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())) ||
            (etudiant.prenomEtudiant &&
              etudiant.prenomEtudiant
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()))
        );
        console.log('Données des étudiants récupérées avec succès :', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants :', error);
        // Display an error message to the user or handle the error appropriately
      }
    );
  }

  deleteEtudiant(id: number) {
    this.etudiantService.deleteEtudiant(id).subscribe(
      (data) => {
        console.log('Etudiant supprimé avec succès :', data);
        this.getEtudiants(); // Refresh the list after successful deletion
      },
      (error) => {
        console.error("Erreur lors de la suppression de l'étudiant :", error);
        // Display an error message to the user or handle the error appropriately
      }
    );
  }

  updateEtudiant(id: number) {
    console.log('Bouton cliqué, redirection vers update/' + id);
    this.router.navigate(['liste/update', id], { relativeTo: this.route });
  }

  createEtudiant() {
    console.log('Bouton création cliqué, redirection vers create');
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
