import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidat-login',
  templateUrl: './candidat-login.component.html',
  styleUrls: ['../candidat-register/candidat-register.component.css', './candidat-login.component.css']
})
export class CandidatLoginComponent implements OnInit {
  user: any = {};
  MyUser: any
  public erreur: String = ""
  public myName: String = ""
  public loginForm: FormGroup
  test: any
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService) {
    let loginFormControls = {
      username: new FormControl("", [Validators.required, Validators.email]),
      mdp: new FormControl("", [Validators.required, Validators.minLength(8)])
    }
    this.loginForm = formBuilder.group(loginFormControls)
  }

  get username() { return this.loginForm.get('username') }
  get mdp() { return this.loginForm.get('mdp') }
  ngOnInit(): void {
  }

  loginCandidat() {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.test = data
        localStorage.setItem("token", this.test.access_token);

        this.myName = data.username;
        this.authService.getuserbyusername(this.test.username).subscribe(file => {
          this.test = file


          if (this.test.role == "ROLE_ADMIN" || this.test.role == "ROLE_SUPER_ADMIN") {
            this.router.navigate(['/Accueil'])

          } else
            if (this.test.role = "ROLE_CANDIDAT") {
              this.router.navigate(['/MonCompte'])

            } else {
              this.router.navigate(['/Authentication'])
            }

        })
      },
      err => {
        this.toastr.error("Email ou Mot de passe incorrect");
        this.router.navigate(['/Authentication'])
      }
    );


  }

}
