import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { path } from '../VariablesGlobales';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-admin-candidat-profile',
  templateUrl: './admin-candidat-profile.component.html',
  styleUrls: ['./admin-candidat-profile.component.css']
})
export class AdminCandidatProfileComponent implements OnInit {
  public id: any
  Candidat: any = {};
  lie2: String = path + "candidats/photo/";
  testimg = false
  testNavig = false

  date:any
  user: any
  public token: any
  public tokenob: any
  public username: String = ""
  constructor(private authService: AuthService, private _Activatedroute: ActivatedRoute, public http: HttpClient, private router: Router) { }

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
      this.id = this._Activatedroute.snapshot.paramMap.get("id");

      //get candidat
      this.http.get<any>(path + "candidats/" + this.id)
        .subscribe(
          (result) => {
            this.Candidat = result;
            if(this.Candidat.entretien != null)
              {
            this.date=this.Candidat.entretien.date;
            var dd=this.date.substring(8,10);
            var mm=this.date.substring(5,7);
            var yy=this.date.substring(0,4);
            this.date=dd+"-"+mm+"-"+yy;     
              }    
            

            if (this.Candidat.photo != "" && this.Candidat.photo != null)
              this.testimg = true
          },
          (error) => { }
        )
    }
    else
      this.router.navigate(['/']);
  }

}
