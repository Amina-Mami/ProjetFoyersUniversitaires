import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { NgToastService } from 'ng-angular-popup';
import { Bloc } from 'src/app/Models/Bloc';
import { Foyer } from 'src/app/Models/Foyer';
import { CrudService } from 'src/app/Services/CrudBloc';

@Component({
  selector: 'app-modif-bloc',
  templateUrl: './modif-bloc.component.html',
  styleUrls: ['./modif-bloc.component.css'],
})
export class ModifBlocComponent {
  id: number;
  BlocForm: FormGroup;
  bloc: Bloc;
  Listfoyer: Foyer[] = [];
  formSubmitted = false;

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    let formControls = {
      nomBloc: new FormControl('', [Validators.required]),

      capaciteBloc: new FormControl('', [Validators.required]),
      Foyer: new FormControl('', [Validators.required]),
    };
    this.BlocForm = this.fb.group(formControls);
  }
  get nomBloc() {
    return this.BlocForm.get('Bloc');
  }
  get capaciteBloc() {
    return this.BlocForm.get('capaciteBloc');
  }
  get Foyer() {
    return this.BlocForm.get('Foyer');
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

  ngOnInit(): void {
    this.services.getListFoyers().subscribe((foyers) => {
      this.Listfoyer = foyers;
    });
    let idEvent = this.route.snapshot.params['id'];
    this.id = idEvent;
    this.services.findBlocById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.BlocForm.patchValue({
        nomBloc: event.nomBloc,
        capaciteBloc: event.capaciteBloc,
        Foyer: event.foyer,
      });
    });
  }

  updateBloc() {
    let data = this.BlocForm.value;

    let bloc = new Bloc(this.id, data.nomBloc, data.capaciteBloc, data.Foyer);
    console.log(bloc);
    console.log(data);
    this.services.updateBloc(this.id, bloc).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/Bloc']);
    });
  }
}
