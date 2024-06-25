import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FoyerComponent } from './foyer.component';
import { AjouterFoyerComponent } from './ajouter-foyer/ajouter-foyer.component';
import { ModifierFoyerComponent } from './modifier-foyer/modifier-foyer.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FoyerRoutingModule } from './foyer-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';
import { CustomDirectiveDirective } from './custom-directive.directive';

@NgModule({
  declarations: [
    FoyerComponent,
    CustomDirectiveDirective,
    AjouterFoyerComponent,
    ModifierFoyerComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    AppModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    FoyerRoutingModule,
    ReactiveFormsModule,
  ],
})
export class FoyerModule {}
