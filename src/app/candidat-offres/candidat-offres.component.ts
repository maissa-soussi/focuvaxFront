import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { path } from '../VariablesGlobales';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-candidat-offres',
  templateUrl: './candidat-offres.component.html',
  styleUrls: ['./candidat-offres.component.css']
})
export class CandidatOffresComponent implements OnInit {
  //tableau 
  public offres: any[] = []
  public candidat: any = {}
  public checkedOffres: Array<number> = []
  //objet
  t: any = {};
  item: any;
  x: number = 0;
  public id: number = 0;
  //public nb_Offres: any

  public parametres: any = {}
  //variable
  disabledItem = false

  maxcheckedbox = 0
  checkedNumber: number = 0;

  testNavig = false
  user: any
  testCandidat = false
  public token: any
  public tokenob: any
  public username: String = ""

  //pour date

  public nvtoday: String = ""

  constructor(private router: Router, private authService: AuthService, public http: HttpClient) {

  }

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
        if (this.user.role == "ROLE_CANDIDAT") {
          this.testNavig = true
        }

      })
    }

    if (this.testNavig = true) {   //get candidat
      this.http.get<any>(path + "candidats/user/" + this.username)
        .subscribe(
          (result) => {
            this.candidat = result;
            this.id = this.candidat.id;
            if (this.candidat.id != null) {
              this.testCandidat = true;
            }
            else {
              this.testCandidat = false;
            }

          },
          (error) => { }
        )

      //get Parametres
      this.http.get<any>(path + "parametrages/1")
        .subscribe(
          (result) => {
            this.parametres = result;
            this.convertnbOffreToString();
          },
          (error) => { console.log(error) }
        )

      //get Offres
      this.http.get<any>(path + "offres")
        .subscribe(
          (result) => {
            this.offres = result;
          },
          (error) => { }
        )
    }
    else
      this.router.navigate(['/']);
  }

  // pop up view Offre

  test(objet: any) {
    this.t = objet;
  }
  checkedState(event: any, checkBox: any, id: number) {
    if (event.target.checked === true) {
      if (this.checkedNumber < this.maxcheckedbox) {
        this.checkedNumber++
        this.checkedOffres.push(id);
      } else {
        event.target.checked = false;
      }
    } else if (this.checkedNumber > 0) {

      this.checkedNumber--;
      const index: number = this.checkedOffres.indexOf(id);
      if (index !== -1) {
        this.checkedOffres.splice(index, 1);
      }

    }
  }

  convertnbOffreToString() {
    if (this.parametres.nb_Offre != null) {
      this.maxcheckedbox = this.parametres.nb_Offre;
    }
  }

  CandidatOffre() {

    if (this.testCandidat == true) {
        this.http.put<any>(path + "candidats/" + this.id + "/offres", this.checkedOffres)
          .subscribe(
            (result) => {

            },
            (error) => { }
          )
      
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      this.nvtoday = yyyy + '-' + mm + '-' + dd;
      this.http.post<any>(path + "candidats/postulation/" + this.nvtoday, this.candidat)
        .subscribe(
          (result) => {

          },
          (error) => { }
        )

      window.location.reload();
     

    }

  }

}

