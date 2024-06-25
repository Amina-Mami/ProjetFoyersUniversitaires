import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoyerService } from 'src/app/Services/foyer.service';
import { Universite } from 'src/app/Models/Universite';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajouter-foyer',
  templateUrl: './ajouter-foyer.component.html',
  styleUrls: ['./ajouter-foyer.component.css'],
})
export class AjouterFoyerComponent implements OnInit {
  FoyerForm: FormGroup;
  universites: Universite[];

  constructor(
    private foyerService: FoyerService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchUniversites();
  }

  initializeForm(): void {
    this.FoyerForm = this.fb.group({
      nomFoyer: ['', [Validators.required, Validators.minLength(3)]],
      capaciteFoyer: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.min(100),
          Validators.max(600),
        ],
      ],
      idUniversite: ['', Validators.required],
    });
  }

  fetchUniversites(): void {
    this.foyerService.getUniversites().subscribe(
      (universites) => {
        this.universites = universites;
      },
      (error) => {
        console.error('Error fetching universities', error);
      }
    );
  }

  onSubmit(): void {
    if (this.FoyerForm.invalid) {
      return;
    }

    const formData = {
      ...this.FoyerForm.value,
      idUniversite: Number(this.FoyerForm.value.idUniversite),
    };

    this.foyerService.ajouterFoyer(formData).subscribe(
      (response) => {
        console.log('Foyer ajouté avec succès', response);

        this.snackBar.open('Foyer ajouté avec succès', 'Fermer', {
          panelClass: ['my-custom-snackbar'],
        });

        this.FoyerForm.reset();

        setTimeout(() => {
          this.router.navigate(['/foyers']);
        }, 2000); // 2000 milliseconds = 2 seconds
      },
      (error) => {
        console.error("Erreur dans l'ajout du foyer", error);
        this.snackBar.open("Erreur lors de l'ajout du foyer", 'Fermer', {
          duration: 3000,
          verticalPosition: 'top', // Position the snackbar at the top
          panelClass: ['error-snackbar'], // Optional styling class for error
        });
      }
    );
  }

  validateField(field: string): boolean {
    const control = this.FoyerForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  getErrorMessage(field: string): string {
    const control = this.FoyerForm.get(field);
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (control?.hasError('minlength')) {
      return 'Le champ doit contenir au moins 3 caractères';
    }
    if (control?.hasError('pattern')) {
      return 'Ce champ ne contient que des chiffres';
    }
    if (control?.hasError('min')) {
      return 'La capacité doit être au moins 100';
    }
    if (control?.hasError('max')) {
      return 'La capacité ne peut pas dépasser 600';
    }
    return '';
  }

  onReset(): void {
    this.FoyerForm.reset();
  }
}
