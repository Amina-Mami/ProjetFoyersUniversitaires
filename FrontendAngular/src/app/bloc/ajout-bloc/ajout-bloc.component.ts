import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgToastService } from 'ng-angular-popup';
import { Bloc } from 'src/app/Models/Bloc';
import { Foyer } from 'src/app/Models/Foyer';
import { CrudService } from 'src/app/Services/CrudBloc';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajout-bloc',
  templateUrl: './ajout-bloc.component.html',
  styleUrls: ['./ajout-bloc.component.css']
})
export class AjoutBlocComponent {
  BlocForm: FormGroup
  messageAjout: string = '';
  nouveauBloc: Bloc = new Bloc();
  Listfoyer: Foyer[] = [];
  formSubmitted = false;

  constructor(private services: CrudService, private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar // MatSnackBar injection
  ) {
    let formControls = {
      nomBloc: new FormControl('', [
        Validators.required,
        Validators.minLength(4),]),


      capaciteBloc: new FormControl('', [
        Validators.required,
        Validators.minLength(4),]),
      Foyer: new FormControl('', [
        Validators.required,]),


    }
    this.BlocForm = this.fb.group(formControls)
  }
  ngOnInit() {
    // Fetch list of foyers from the database
    this.services.getListFoyers().subscribe((foyers) => {
      this.Listfoyer = foyers;
    })
  }
  get nomBloc() { return this.BlocForm.get('Bloc'); }
  get capaciteBloc() { return this.BlocForm.get('capaciteBloc'); }
  get Foyer() { return this.BlocForm.get('Foyer'); }

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





  onSubmit() {
    this.formSubmitted = true;
    let data = this.BlocForm.value;
    console.log(data);
    let bloc = new Bloc(
      undefined, data.nomBloc, data.capaciteBloc, data.Foyer
    );
    console.log(bloc);

    if (
      data.nomBloc == 0 ||
      data.capaciteBloc == 0
    ) {
      // Use MatSnackBar to show an error message
      this.snackBar.open('Remplir votre champs', 'Erreur', {
        duration: 3000, // Duration in milliseconds
        panelClass: ['error-snackbar'] // You can define your own styles for the snackbar
      });
    } else {
      this.services.addBloc(bloc).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/Bloc']);
          // Use MatSnackBar to show a success message
          this.snackBar.open('Bloc ajoutée', 'Succès', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });


        },
        err => {
          console.log(err);
          // Use MatSnackBar to show an error message
          this.snackBar.open('Problème de Serveur', 'Erreur', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }





}
