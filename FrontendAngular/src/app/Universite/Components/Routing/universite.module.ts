import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUniversiteComponent } from '../AddUniversite/add-universite/add-universite.component';
import { ListUniversiteComponent } from '../ListUniversite/list-universite/list-universite.component';
import { UpdateUniversiteComponent } from '../UpdateUniversite/update-universite/update-universite.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../ListUniversite/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppModule } from 'src/app/app.module';
import { UniversiteRoutingModule } from './Universite-routing.module';



@NgModule({
  declarations: [
    AddUniversiteComponent,
    ListUniversiteComponent,
    UpdateUniversiteComponent,
    FilterPipe, // Ajoutez le filtre
  ],
  imports: [
    AppModule,
    CommonModule,
    UniversiteRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class UniversiteModule { }
