import { Component } from '@angular/core';
import { Bloc } from '../Models/Bloc';
import { Router } from '@angular/router';
import { CrudService } from '../Services/CrudBloc';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent {
  listBlocs: Bloc[]
  numberOfBlocs: number = 0

  constructor(private service: CrudService, private router: Router) { }

  onDeleteBloc(bloc: Bloc) {
    if (confirm("Voulez vous supprimer ce bloc ?")) {

      this.service.deleteBloc(bloc.idBloc).subscribe(() => {
        this.router.navigate(['/ListBloc']).then(() => {
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
}
