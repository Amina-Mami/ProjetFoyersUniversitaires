import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importez FormBuilder et FormGroup
import { Universite } from 'src/app/Models/Universite';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Foyer } from 'src/app/Models/Foyer';
import { FoyerService } from 'src/app/Services/foyer.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-modifier-foyer',
  templateUrl: './modifier-foyer.component.html',
  styleUrls: ['./modifier-foyer.component.css']
})
export class ModifierFoyerComponent {

  foyerForm: FormGroup; // Ajoutez un formulaire réactif

  foyer: Foyer;
  universites: Universite[];
  initialFoyer: Foyer;
  

  constructor(
    private dialogRef: MatDialogRef<ModifierFoyerComponent>,
    @Inject(MAT_DIALOG_DATA) data: { foyer: Foyer },
    private fb: FormBuilder, // Injectez FormBuilder
    private foyerService: FoyerService,
    private dialog: MatDialog
  ) {
    this.foyer = data.foyer ? { ...data.foyer } : new Foyer();
    this.initialFoyer = { ...this.foyer };
    this.fetchUniversites();
  

    // Initialisez le formulaire réactif
    this.foyerForm = this.fb.group({
      idFoyer: [null],
      nomFoyer: ['', [Validators.required, Validators.minLength(3)]],
      capaciteFoyer: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(100), Validators.max(600)]],
      nomUniversite: ['', Validators.required],
    });

  

    // Appliquez les valeurs initiales au formulaire
    this.foyerForm.patchValue(this.initialFoyer);
  }
  fetchUniversites(): void {
    this.foyerService.getUniversites().subscribe(
      universities => {
        this.universites = universities;
      },
      error => {
        console.error('Error fetching universities', error);
      }
    );
  }

  modifierFoyer(): void {
    // Assurez-vous que le formulaire est valide avant de soumettre
    if (this.foyerForm.valid) {
      // Utilisez la valeur du formulaire réactif pour la modification
      const formData = this.foyerForm.value;

      this.foyerService.modifierFoyer(formData).subscribe(
        response => {
          console.log('Foyer modifié avec succès', response);
          this.dialogRef.close('success');
          this.afficherConfirmationModification();
        },
        error => {
          console.error("Erreur dans la modification du foyer", error);
        }
      );
    }
  }

  afficherConfirmationModification(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Foyer modifié avec succès', isModification: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        // Mettez à jour la liste des foyers après la modification
        // this.chargerFoyers(); // Assurez-vous que cette méthode est définie dans votre composant FoyerComponent
      }
    });
  }

 
  annulerModification(): void {
    // Réinitialisez les valeurs du formulaire aux valeurs initiales
    this.foyerForm.patchValue(this.initialFoyer);
    // Fermez le pop-up après avoir annulé la modification
    this.dialogRef.close();
  }
}

