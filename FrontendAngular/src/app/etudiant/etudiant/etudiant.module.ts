import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantRoutingModule } from './etudiant-routing.module';
import { EtudiantListeComponent } from '../etudiant-liste/etudiant-liste.component';
import { EtudiantUpdateComponent } from '../etudiant-update/etudiant-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEtudiantComponent } from '../create-etudiant/create-etudiant.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from '../../app.module';
import { AgeValidationDirective } from '../age-validation.directive';
@NgModule({
  declarations: [  
    EtudiantListeComponent,
    EtudiantUpdateComponent,
    CreateEtudiantComponent,
    AgeValidationDirective,
  ],
  imports: [
   AppModule,
  CommonModule,
  EtudiantRoutingModule,
  //BrowserModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  ]
})
export class EtudiantModule {}
