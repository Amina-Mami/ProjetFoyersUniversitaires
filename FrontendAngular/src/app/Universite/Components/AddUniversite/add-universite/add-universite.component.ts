import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Universite } from 'src/app/Models/Universite';
import { CrudUniversite } from 'src/app/Service/CrudUniversite';
import { Router } from '@angular/router';
import { Foyer } from 'src/app/Models/Foyer';

@Component({
  selector: 'app-add-universite',
  templateUrl: './add-universite.component.html',
  styleUrls: ['./add-universite.component.css'],
})
export class AddUniversiteComponent implements OnInit {
  BlocForm: FormGroup;
  foyers: Foyer[];
  formSubmitted = false;

  constructor(
    private services: CrudUniversite,
    private router: Router,
    private fb: FormBuilder
  ) {
    let formControls = {
      nomUniversite: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      adresse: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      foyer: new FormControl('', [Validators.required]),
    };
    this.BlocForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    this.services.getFoyers().subscribe(
      (foyers) => {
        this.foyers = foyers;
        console.log(foyers);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get nomUniversite() {
    return this.BlocForm.get('nomUniversite');
  }
  get adresse() {
    return this.BlocForm.get('adresse');
  }
  get foyer() {
    return this.BlocForm.get('foyer');
  }

  validateField(field: string) {
    return (
      this.BlocForm.get(field)?.invalid &&
      (this.BlocForm.get(field)?.touched || this.formSubmitted)
    );
  }

  getErrorMessage(field: string) {
    if (this.BlocForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (this.BlocForm.get(field)?.hasError('minlength')) {
      return 'Ce champ doit contenir au moins 4 caractères';
    }

    return '';
  }

  addNewUniversite() {
    this.formSubmitted = true;

    if (this.BlocForm.invalid) {
      return;
    }

    let data = this.BlocForm.value;
    console.log(data);

    let selectedFoyer = this.foyers.find(
      (foyer) => foyer.idFoyer == data.foyer
    );

    if (selectedFoyer) {
      let universite = new Universite(
        undefined,
        data.nomUniversite,
        data.adresse,
        selectedFoyer
      );

      console.log(universite);

      this.services.addUniversite(universite).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/listeUniversite']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
