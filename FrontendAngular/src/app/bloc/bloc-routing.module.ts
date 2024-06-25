import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutBlocComponent } from './ajout-bloc/ajout-bloc.component';
import { ModifBlocComponent } from './modif-bloc/modif-bloc.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },

  { path: 'AjouterBloc', component: AjoutBlocComponent },
  { path: 'ModifierBloc/:id', component: ModifBlocComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlocRoutingModule {}
