import { Component, OnInit } from '@angular/core';
import { FoyerService } from '../Services/foyer.service';
import { Foyer } from '../Models/Foyer';

import { AjouterFoyerComponent } from './ajouter-foyer/ajouter-foyer.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { ModifierFoyerComponent } from './modifier-foyer/modifier-foyer.component';
import { DialogService } from '../dialog.service';
import { Universite } from '../Models/Universite';

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css'],
})
export class FoyerComponent implements OnInit {
  foyers: Foyer[] = [];

  universites: Universite[] = [];

  constructor(
    private foyerService: FoyerService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  messageSuppression: string = '';
  rechercheFoyer: string = '';
  customColor: string = '#f0f0f0';
  shouldPrint = false;
  selectedUniversiteId: number | null = null;

  ngOnInit() {
    this.foyerService.getFoyers().subscribe(
      (data) => {
        console.log('Données reçues du service', data);
        this.foyers = data;
      },
      (error) => console.error('Erreur dans la récupération des foyers', error)
    );

    this.foyerService.modificationReussieMessage$.subscribe((message) => {
      console.log('Message de modification réussie:', message);
    });

    this.foyerService.getUniversites().subscribe(
      (data) => {
        this.universites = data;
      },
      (error) => {
        console.error('Erreur dans la récupération des universités', error);
      }
    );
  }

  chargerFoyers() {
    this.foyerService.getFoyers().subscribe(
      (data) => {
        console.log('Données reçues du service', data);

        this.foyers = this.filtrerFoyers(data);
      },
      (error) => console.error('Erreur dans la récupération des foyers', error)
    );
  }

  filtrerFoyers(foyers: Foyer[]): Foyer[] {
    return foyers.filter((foyer) =>
      foyer.nomFoyer.toLowerCase().includes(this.rechercheFoyer.toLowerCase())
    );
  }

  rechercherFoyers() {
    this.chargerFoyers();
  }

  trierFoyers() {
    this.foyers.sort((a, b) => (a.nomFoyer > b.nomFoyer ? 1 : -1));
  }

  confirmerSuppression(idFoyer: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Êtes-vous sûr de supprimer ce foyer?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // L'utilisateur a confirmé la suppression, appelez la méthode de suppression
        this.supprimerFoyer(idFoyer);
      } else {
        // L'utilisateur a annulé la suppression, vous pouvez ajouter d'autres logiques ici si nécessaire
        console.log('Suppression annulée');
      }
    });
  }

  supprimerFoyer(idFoyer: number): void {
    this.foyerService.supprimerFoyer(idFoyer).subscribe(
      () => {
        console.log('Foyer supprimé avec succès');
        this.messageSuppression = 'Foyer supprimé avec succès';
        this.dialogService.openConfirmationDialog(this.messageSuppression);
        this.chargerFoyers();
      },
      (error) => {
        console.error('Erreur dans la suppression du foyer', error);
        this.messageSuppression = 'Erreur lors de la suppression du foyer';
        this.dialogService.openConfirmationDialog(this.messageSuppression);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjouterFoyerComponent, {
      panelClass: 'custom-dialog-container',
      hasBackdrop: true, // Activer le fond désactivé
      backdropClass: 'custom-backdrop', // Classe CSS pour personnaliser le fond
    });
  }

  ouvrirDialogueModification(foyer: Foyer): void {
    const dialogRef = this.dialog.open(ModifierFoyerComponent, {
      width: '400px',
      data: { foyer: { ...foyer } }, // Copiez les valeurs du foyer pour éviter les modifications directes
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        // Mettez à jour la liste des foyers après la modification
        this.chargerFoyers();
      }
    });
  }

  printFoyers(): void {
    window.print();
  }
}
