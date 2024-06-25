// etudiant-update.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../Services/etudiant.service';

@Component({
  selector: 'app-etudiant-update',
  templateUrl: './etudiant-update.component.html',
  styleUrls: ['./etudiant-update.component.css'],
})
export class EtudiantUpdateComponent implements OnInit {
  id!: number;
  etudiantForm: FormGroup;

  constructor(
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.etudiantForm = this.formBuilder.group({
      nomEt: ['', [Validators.required, Validators.minLength(2)]],
      prenomEt: ['', [Validators.required, Validators.minLength(2)]],
      ecole: ['', Validators.required],
      cin: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      dateNaissance: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id']; // Convert id to number

    this.etudiantService.getEtudiantById(this.id).subscribe(
      (data) => {
        this.etudiantForm.patchValue(data); // Initialize form with student data
      },
      (error) => {
        console.log(error);
        // Handle error if necessary
      }
    );
  }

  onSubmit() {
    if (this.etudiantForm.valid) {
      const updatedEtudiant = this.etudiantForm.value;
      updatedEtudiant.id = this.id; // Add id to the updated student object

      this.etudiantService.updateEtudiant(updatedEtudiant).subscribe(
        (data) => {
          console.log('Student updated successfully:', data);
          this.goToEtudiantList();
        },
        (error) => {
          console.log('Error updating student:', error);
          // Handle error if necessary
        }
      );
    }
  }

  goToEtudiantList() {
    this.router.navigate(['/liste']);
  }
}
