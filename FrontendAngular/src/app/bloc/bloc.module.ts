import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocRoutingModule } from './bloc-routing.module';
import { BlocComponent } from './bloc.component';
import { AjoutBlocComponent } from './ajout-bloc/ajout-bloc.component';
import { ModifBlocComponent } from './modif-bloc/modif-bloc.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgToastModule } from 'ng-angular-popup';
import { AppRoutingModule } from '../app-routing.module';
import { ListComponent } from './list/list.component';
import { AppModule } from '../app.module';
import { BasicModule } from '../basic/basic.module';
// import { BasicModule } from '../basic/basic.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    BlocComponent,
    AjoutBlocComponent,
    ModifBlocComponent,
    ListComponent,

  ],
  imports: [
    // AppModule,
    CommonModule,
    BlocRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgToastModule,
    BasicModule,
    MatSnackBarModule,
    // NoopAnimationsModule
  ]
})
export class BlocModule { }
