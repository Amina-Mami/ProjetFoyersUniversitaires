import { Component } from '@angular/core';
import { EtudiantService } from '../../Services/etudiant.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-etudiant',
  templateUrl: './create-etudiant.component.html',
  styleUrls: ['./create-etudiant.component.css'],
})
export class CreateEtudiantComponent {
  etudiantForm!: FormGroup;

  constructor(
    private etudiantService: EtudiantService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.etudiantForm = this.formBuilder.group({
      nomEtudiant: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.containsNumberValidator,
        ],
      ],
      prenomEtudiant: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.containsNumberValidator,
        ],
      ],
      ecole: ['', [Validators.required]],
      cinEtudiant: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      dateNaissance: ['', [Validators.required]],
    });
  }

  containsNumberValidator(control: AbstractControl) {
    const value = control.value;
    const containsNumber = /\d/.test(value);
    return containsNumber ? { containsNumber: true } : null;
  }

  saveEtudiant() {
    this.etudiantService.createEtudiant(this.etudiantForm.value).subscribe(
      (data) => {
        console.log(data);
        this.goToEtudiantList();
      },
      (error) => console.log(error)
    );
  }

  goToEtudiantList() {
    this.router.navigate(['/liste']);
  }
  onAgeValidationStatus(isValid: boolean) {
    if (isValid) {
      // L'âge est valide, vous pouvez prendre des mesures supplémentaires si nécessaire
    } else {
      console.log("L'âge n'est pas valide.");
    }
  }
  onSubmit() {
    if (this.etudiantForm.valid) {
      console.log(this.etudiantForm.value);
      this.saveEtudiant();
    } else {
      console.log(
        "Le formulaire n'est pas valide. Veuillez remplir tous les champs correctement."
      );
    }
  }
}
