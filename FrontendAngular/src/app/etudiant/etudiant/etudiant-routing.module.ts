import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantListeComponent } from '../etudiant-liste/etudiant-liste.component';
import { EtudiantUpdateComponent } from '../etudiant-update/etudiant-update.component';
import { CreateEtudiantComponent } from '../create-etudiant/create-etudiant.component';
import { LayoutComponentComponent } from '../../layout-component/layout-component.component';
const routes: Routes = [
  {
    path: 'liste',
    component: LayoutComponentComponent,
    children: [
      { path: '', component: EtudiantListeComponent },
      { path: 'update/:id', component: EtudiantUpdateComponent },
      { path: 'create', component: CreateEtudiantComponent },
    ],
  },
  { path: '', redirectTo: '/liste', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtudiantRoutingModule {}
