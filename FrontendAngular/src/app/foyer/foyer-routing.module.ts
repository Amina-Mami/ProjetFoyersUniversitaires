import { NgModule } from '@angular/core';
import { FoyerComponent } from './foyer.component';
import { RouterModule, Routes } from '@angular/router';
import { ModifierFoyerComponent } from './modifier-foyer/modifier-foyer.component';
import { AjouterFoyerComponent } from './ajouter-foyer/ajouter-foyer.component';
import { LayoutComponentComponent } from '../layout-component/layout-component.component';

const routes: Routes = [
  {
    path: 'foyers',
    component: LayoutComponentComponent,
    children: [
      { path: '', component: FoyerComponent },
      { path: 'update/:id', component: ModifierFoyerComponent },
      { path: 'ajouterFoyer', component: AjouterFoyerComponent },
    ],
  },
  { path: '', redirectTo: '/foyers', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoyerRoutingModule {}
