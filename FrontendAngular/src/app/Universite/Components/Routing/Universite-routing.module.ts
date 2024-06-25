import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUniversiteComponent } from '../AddUniversite/add-universite/add-universite.component';
import { ListUniversiteComponent } from '../ListUniversite/list-universite/list-universite.component';
import { UpdateUniversiteComponent } from '../UpdateUniversite/update-universite/update-universite.component';
import { LayoutComponentComponent } from 'src/app/layout-component/layout-component.component';
const routes: Routes = [
  {
    path: 'listeUniversite',
    component: LayoutComponentComponent,
    children: [
      { path: '', component: ListUniversiteComponent },
      { path: 'update/:id', component: UpdateUniversiteComponent },
      { path: 'create', component: AddUniversiteComponent },
    ],
  },
  { path: '', redirectTo: '/listeUniversite', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniversiteRoutingModule {}
