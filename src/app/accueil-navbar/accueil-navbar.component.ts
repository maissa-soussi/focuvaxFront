import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { path } from '../VariablesGlobales';
import { AuthService } from '../services/authService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil-navbar',
  templateUrl: './accueil-navbar.component.html',
  styleUrls: ['./accueil-navbar.component.css']
})
export class AccueilNavbarComponent implements OnInit {
  test = false

  testcandidat = false


  public candidat: any = {}

  public token: any
  public tokenob: any
  public username: String = ""
  constructor(private router: Router, private authService: AuthService, public http: HttpClient) { }

  ngOnInit(): void {
    if (localStorage.length != 0) {
      this.test = true
      this.token = localStorage.getItem("token")
      if (this.token != null) {
        this.tokenob = atob(this.token.split('.')[1])
        var oj = (JSON.parse(this.tokenob)!);
        this.username = oj.sub;


        //get candidat
        this.http.get<any>(path + "candidats/user/" + this.username)
          .subscribe(
            (result) => {
              this.candidat = result;
              if (this.candidat.id != null) { this.testcandidat = true; }

            },
            (error) => { }
          )
      }
    }
  }

  logout() {
    localStorage.removeItem("token");
    window.location.reload()
  }

}
