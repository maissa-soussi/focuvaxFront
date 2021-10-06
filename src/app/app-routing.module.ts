import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AccueilComponent } from './accueil/accueil.component';
import { AdminCandidatProfileComponent } from './admin-candidat-profile/admin-candidat-profile.component';
import { AdminCandidatsComponent } from './admin-candidats/admin-candidats.component';
import { AdminOffresComponent } from './admin-offres/admin-offres.component';
import { AdminsComponent } from './admins/admins.component';
import { CandidatCompteComponent } from './candidat-compte/candidat-compte.component';
import { CandidatLoginComponent } from './candidat-login/candidat-login.component';
import { CandidatOffresComponent } from './candidat-offres/candidat-offres.component';
import { CandidatRegisterComponent } from './candidat-register/candidat-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParametresComponent } from './parametres/parametres.component';
import { CandidatProfileComponent } from './candidat-profile/candidat-profile.component';
import { CvComponent } from './cv/cv.component';
import { MailComponent } from './mail/mail.component';

const routes: Routes = [
  {
    path: "",
    component: AccueilComponent
  },
  {
    path: "CreerCompte",
    component: CandidatRegisterComponent
  },
  {
    path: "Authentification",
    component: CandidatLoginComponent
  },
  {
    path: "MonCompte",
    component: CandidatCompteComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Offres",
    component: CandidatOffresComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "OffresAdmin",
    component: AdminOffresComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Candidats",
    component: AdminCandidatsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Accueil",
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Parametrages",
    component: ParametresComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Admins",
    component: AdminsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Profile/:id",
    component: AdminCandidatProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "EspaceCandidat",
    component: CandidatProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Profile/:id/Cv",
    component: CvComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Mail",
    component: MailComponent,
    canActivate:[AuthGuard]
  }
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
