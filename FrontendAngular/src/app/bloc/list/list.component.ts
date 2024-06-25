import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bloc } from 'src/app/Models/Bloc';
import { CrudService } from 'src/app/Services/CrudBloc';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  listBlocs: Bloc[]
  numberOfBlocs: number = 0
  rechercheblocs: String = "";
  constructor(private service: CrudService, private router: Router) { }

  onDeleteBloc(bloc: Bloc) {
    if (confirm("Voulez vous supprimer ce bloc ?")) {

      this.service.deleteBloc(bloc.idBloc).subscribe(() => {
        this.router.navigate(['/Bloc']).then(() => {
          window.location.reload()
        })
      })
    }
  }
  ngOnInit(): void {

    
    this.service.getBlocs().subscribe(blocs => {
      this.listBlocs = blocs

      this.numberOfBlocs = blocs.length
      console.log(blocs)
    })
  }
  filtrerBlocs(blocs: Bloc[]): Bloc[] {
    return blocs.filter(bloc => bloc.nomBloc.toLowerCase().includes(this.rechercheblocs.toLowerCase()))
  }
  rechercheBlocs() {
    this.chargerBlocs();
  }
  chargerBlocs() {
    this.service.getBlocs().subscribe(data => {
      console.log('Données reçues du service', data);
      this.listBlocs = this.filtrerBlocs(data);
    },
      error => console.error('erreur dans la recuperation des foyers', error));
  }
  trierBlocs() {
    this.listBlocs.sort((a, b) => (a.nomBloc > b.nomBloc) ? 1 : -1)

  }
  printBlocs(): void {
    window.print();
  }
}
