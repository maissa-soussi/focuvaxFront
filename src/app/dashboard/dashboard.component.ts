import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { path } from '../VariablesGlobales';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public nbCandidat = 0
  public nbOffre = 0
  public nbEntretien = 0
  public nbNoEntretien = 0
  public parametres: any
  public etatList: any[] = []
  public offres: any[] = []
  offreStat: any

  index=-1

  user: any
  public token: any
  public tokenob: any
  public username: String = ""

  constructor(private router: Router, private authService: AuthService, public http: HttpClient) { }

  ngOnInit(): void {

    //get username from localStorage
    this.token = localStorage.getItem("token")
    if (this.token != null) {  //lire username
      this.tokenob = atob(this.token.split('.')[1])
      var oj = (JSON.parse(this.tokenob)!);
      this.username = oj.sub;
      //avoir le role
      this.authService.getuserbyusername(this.username).subscribe(file => {
        this.user = file
        if (this.user.role == "ROLE_ADMIN" || this.user.role == "ROLE_SUPER_ADMIN") {
          this.router.navigate(['/Accueil'])
        } else
          if (this.user.role = "ROLE_CANDIDAT") {
            this.router.navigate(['/'])
          }

      })
    }


    //get Offres
    this.http.get<any>(path + "offres")
    .subscribe(
      (result) => {
        this.offres = result;
      },
      (error) => { }
    )
    
    

    //get OffresStat
    this.http.get<any>(path + "offresStat")
    .subscribe(
      (result) => {
        this.offreStat = result;
      },
      (error) => { }
    )

    
    

    //get nb candidats
    this.http.get<any>(path + "candidats/nb")
      .subscribe(
        (result) => {
          this.nbCandidat = result;
        },
        (error) => { }
      )


    //get nb offres
    this.http.get<any>(path + "offres/nb")
      .subscribe(
        (result) => {
          this.nbOffre = result;
        },
        (error) => { }
      )

    //get nb entretiens
    this.http.get<any>(path + "candidats/entretiens/nb")
      .subscribe(
        (result) => {
          this.nbEntretien = result;
        },
        (error) => { }
      )

    //get nb attente
    this.http.get<any>(path + "candidats/noEntretiens/nb")
      .subscribe(
        (result) => {
          this.nbNoEntretien = result;
        },
        (error) => { }
      )

    
  }

  convertEtatToString() {
    this.etatList = this.parametres.etat.split("|");
    this.etatList = this.etatList.sort();
  }

}
