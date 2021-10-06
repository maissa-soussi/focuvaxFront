import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { path } from '../VariablesGlobales';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/authService';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { isToday } from 'date-fns';

@Component({
  selector: 'app-admin-candidats',
  templateUrl: './admin-candidats.component.html',
  styleUrls: ['./admin-candidats.component.css']
})
export class AdminCandidatsComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  public candidats: any[] = []
  public offreList: any[] = []
  public offreForm: FormGroup
  offreAjout: any = {};
  candidatAModif: any = {};
  public heures: any
  public parametres: any
  public etatList: any = []
  public lieux: any
  public stat = 0
  public nvtoday: String = ""
  viewDate: Date = new Date();
  theDate: any
  ancienDate: any
  date: any
  entretien: any = {};
  entretienResult: any;
  hourById: any = {}


  testNavig = false
  user: any
  public token: any
  public tokenob: any
  public username: String = ""
  minDate = new Date();

  constructor(private router: Router, private authService: AuthService, public http: HttpClient, private formBuilder: FormBuilder) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-orange',
        showWeekNumbers: false,
        dateInputFormat: 'DD-MM-YYYY'
      });
    let offreFormControls = {
      offre: new FormControl("", [Validators.required])
    }
    this.offreForm = formBuilder.group(offreFormControls)
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
        if (this.user.role == "ROLE_ADMIN" || this.user.role == "ROLE_SUPER_ADMIN") {
          this.testNavig = true
        }

      })
    }

    if (this.testNavig = true) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      this.nvtoday = yyyy + '-' + mm + '-' + dd;


      //get candidats
      this.http.get<any>(path + "candidats")
        .subscribe(
          (result) => {
            this.candidats = result;
          },
          (error) => { }
        )

      //get offres
      this.http.get<any>(path + "offres")
        .subscribe(
          (result) => {
            this.offreList = result;
          },
          (error) => { }
        )


      //get heures
      this.http.get<any>(path + "heures")
        .subscribe(
          (result) => {
            this.heures = result;
          },
          (error) => { }
        )
        //get lieux
      this.http.get<any>(path + "lieux")
      .subscribe(
        (result) => {
          this.lieux = result;
        },
        (error) => { }
      )

      //get Parametres
      this.http.get<any>(path + "parametrages/1")
        .subscribe(
          (result) => {
            this.parametres = result;
            this.convertObjToString();
          },
          (error) => { }
        )
    }
    else
      this.router.navigate(['/']);
  }


  convertObjToString() {
    if (this.parametres.etat != null) {
      this.etatList = this.parametres.etat.split("|");
      this.etatList = this.etatList.sort();
    }
  }

  tri(o: any) {
    //console.log(this.offreAjout.ref);
    if (o.value == "Tous") {
      //get candidats
      this.http.get<any>(path + "candidats")
        .subscribe(
          (result) => {
            this.candidats = result;
          },
          (error) => { }
        )
    }
    else {
      //get candidats selon ref
      this.http.get<any>(path + "candidats/offres/" + o.value)
        .subscribe(
          (result) => {
            this.candidats = result;
          },
          (error) => { }
        )
    }

  }

  dateChoosed(heure: any, lieu:any) {
    if (heure != "HEURE" && heure != 0 && this.theDate != null && lieu != "LIEU" && lieu != 0 ) {
      Date.prototype.toJSON = function () {
        const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
        this.setHours(hoursDiff);
        return this.toISOString();
      };
      this.date = JSON.stringify((this.theDate).toString())
      this.date = new Date(this.date)
      this.date = JSON.stringify(this.date)

      this.date = this.date.substring(1, 11);

      //get Stat of date and hour
      this.http.get<any>(path + "candidats/nbentretiens/dateHourNumber/" + this.date + "/" + heure+"/"+lieu)
        .subscribe(
          (result) => {
            this.stat = result;

          },
          (error) => { }
        )
    }
  }

  ajoutEntretien(h: any, e: any, l:any) {
    if (h != 0 && e != "ETAT" && l != 0 && this.theDate != null) {
      this.entretien.date = this.date;
      this.http.post<any>(path + "entretiens/" + h, this.entretien)
        .subscribe(
          (result) => {
            this.entretienResult = result;
            //put entretien
            this.http.put<any>(path + "candidats/entretiens/" + this.entretienResult + "/" + e, this.candidatAModif)
              .subscribe(
                (res) => {
                },
                (err) => { }
              )

              //put lieu 
              this.http.put<any>(path + "candidats/lieuPut/" + l, this.candidatAModif)
        .subscribe(
          (res) => {
          },
          (err) => { }
        )
        window.location.reload();
          },
          (error) => {
          }
        )
    }
    
    if (h == 0 && e != "ETAT") {
      this.http.put<any>(path + "candidats/etatPut/" + e, this.candidatAModif)
        .subscribe(
          (res) => {
          },
          (err) => { }
        )
    }

  }


  candidatModif(c: any) {
    this.candidatAModif = c;

  }

}
