import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { path } from '../VariablesGlobales';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';
@Component({
  selector: 'app-candidat-profile',
  templateUrl: './candidat-profile.component.html',
  styleUrls: ['./candidat-profile.component.css']
})
export class CandidatProfileComponent implements OnInit {
  public id: any
  candidat: any = {};
  lie: String = path + "candidats/cv/";
  lie2: String = path + "candidats/photo/";
  testimg = false
  testNavig = false
  user: any
  public token: any
  public tokenob: any
  public username: String = ""
  date:any

  theUser: any = {}
  constructor(private authService: AuthService, public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    if (this.token != null) {
      this.tokenob = atob(this.token.split('.')[1])
      var oj = (JSON.parse(this.tokenob)!);
      this.username = oj.sub;


      //get candidat
      this.http.get<any>(path + "myUser/" + this.username)
        .subscribe(
          (result) => {
            this.theUser = result;
            if (this.theUser.role == "ROLE_CANDIDAT") {
              this.testNavig = true
            }
          },
          (error) => { console.log(error) }
        )

      if (this.testNavig = true) { //get candidat
        this.http.get<any>(path + "candidats/user/" + this.username)
          .subscribe(
            (result) => {
              this.candidat = result;
              if(this.candidat.entretien != null)
              {this.date=this.candidat.entretien.date;
              var dd=this.date.substring(8,10);
              var mm=this.date.substring(5,7);
              var yy=this.date.substring(0,4);
              this.date=dd+"-"+mm+"-"+yy;  }   
              if (this.candidat.id != null) {
                this.router.navigate(['/EspaceCandidat']);
                if (this.candidat.photo != "" && this.candidat.photo != null)
                  this.testimg = true
              }
              else {
                this.router.navigate(['/MonCompte']);
              }

            },
            (error) => { }
          )

      }
      else
        this.router.navigate(['/']);
    } else
      this.router.navigate(['/']);
  }

}
