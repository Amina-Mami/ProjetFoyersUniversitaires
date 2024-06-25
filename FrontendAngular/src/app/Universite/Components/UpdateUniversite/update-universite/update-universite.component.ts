import { Component, OnInit } from '@angular/core';
import { CrudUniversite } from 'src/app/Service/CrudUniversite';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Universite } from 'src/app/Models/Universite';
import { Foyer } from 'src/app/Models/Foyer';

@Component({
  selector: 'app-update-universite',
  templateUrl: './update-universite.component.html',
  styleUrls: ['./update-universite.component.css'],
})
export class UpdateUniversiteComponent implements OnInit {
  id: number;
  BlocForm: FormGroup;
  formSubmitted = false;
  foyers: Foyer[];

  constructor(
    private services: CrudUniversite,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
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
      foyer: new FormControl('', []),
    };
    this.BlocForm = this.fb.group(formControls);
  }

  get nomUniversite() {
    return this.BlocForm.get('nomUniversite');
  }
  get adresse() {
    return this.BlocForm.get('adresse');
  }
  get Foyer() {
    return this.BlocForm.get('Foyer');
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.id = id;
    console.log('ID:', id);

    this.services.findUniversiteById(id).subscribe((result) => {
      let event = result;
      console.log(event);
      this.BlocForm.patchValue({
        nomUniversite: event.nomUniversite,
        adresse: event.adresse,
        Foyer: event.foyer,
      });
    });
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
    // Ajoutez d'autres messages d'erreur personnalisés si nécessaire
    return '';
  }

  updateUniversite() {
    this.services.getFoyers().subscribe((foyers) => {
      this.foyers = foyers;
    });
    let data = this.BlocForm.value;

    if (this.BlocForm.invalid) {
      return;
    }

    let universite = new Universite(
      this.id,
      data.nomUniversite,
      data.adresse,
      data.Foyer
    );
    console.log(universite);
    console.log(data);
    this.services.updateUniversite(this.id, universite).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/listeUniversite']);
    });
  }
}
