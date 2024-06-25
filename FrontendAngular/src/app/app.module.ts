import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { AjoutComponent } from './ajout/ajout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ModifComponent } from './modif/modif.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { E404Component } from './e404/e404.component';
import {ChambreComponent} from "./chambre/chambre.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { MatDialogModule } from '@angular/material/dialog';
import { ReservationComponent } from './reservation/reservation/reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AjoutComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    ModifComponent,
    DashboardComponent,
    LoginComponent,
    LayoutComponentComponent,
    E404Component,
    ChambreComponent,
    ReservationComponent,

  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
    MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
