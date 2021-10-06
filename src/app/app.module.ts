import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MapComponent } from './map/map.component';
import { AccueilNavbarComponent } from './accueil-navbar/accueil-navbar.component';
import { CandidatLoginComponent } from './candidat-login/candidat-login.component';
import { CandidatRegisterComponent } from './candidat-register/candidat-register.component';
import { CandidatCompteComponent } from './candidat-compte/candidat-compte.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { CandidatOffresComponent } from './candidat-offres/candidat-offres.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminOffresComponent } from './admin-offres/admin-offres.component';
import { AdminCandidatsComponent } from './admin-candidats/admin-candidats.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminsComponent } from './admins/admins.component';
import { ParametresComponent } from './parametres/parametres.component';
import { AdminCandidatProfileComponent } from './admin-candidat-profile/admin-candidat-profile.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CandidatProfileComponent } from './candidat-profile/candidat-profile.component';
import { CvComponent } from './cv/cv.component';
import { MailComponent } from './mail/mail.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    MapComponent,
    AccueilNavbarComponent,
    CandidatLoginComponent,
    CandidatRegisterComponent,
    CandidatCompteComponent,
    CandidatOffresComponent,
    AdminNavbarComponent,
    AdminOffresComponent,
    AdminCandidatsComponent,
    DashboardComponent,
    AdminsComponent,
    ParametresComponent,
    AdminCandidatProfileComponent,
    CandidatProfileComponent,
    CvComponent,
    MailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    BsDatepickerModule.forRoot(),
	  ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
