import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { path } from '../VariablesGlobales';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admin: any = {};
  public admins: any[] = []
  public status: string = "";
  public adminForm: FormGroup

  testRole = false

  testNavig = false
  user: any
  public token: any
  public tokenob: any
  public usernametoken: String = ""

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    let adminFormControls = {
      nom: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z][a-z '.]*"),
        Validators.minLength(2)
      ]),
      prenom: new FormControl("", [Validators.required,
      Validators.pattern("[A-Z][a-z '.]*"),
      Validators.minLength(2)
      ]),
      username: new FormControl("", [Validators.required, Validators.email]),
      mdp: new FormControl("", [Validators.required, Validators.minLength(8)]),
      mdp1: new FormControl("", [Validators.required, Validators.minLength(8)])
    }
    this.adminForm = formBuilder.group(adminFormControls)
  }

  get nom() { return this.adminForm.get('nom') }
  get prenom() { return this.adminForm.get('prenom') }
  get username() { return this.adminForm.get('username') }
  get mdp() { return this.adminForm.get('mdp') }
  get mdp1() { return this.adminForm.get('mdp1') }

  ngOnInit(): void {
    //get username from localStorage
    this.token = localStorage.getItem("token")
    if (this.token != null) {  //lire username
      this.tokenob = atob(this.token.split('.')[1])
      var oj = (JSON.parse(this.tokenob)!);
      this.usernametoken = oj.sub;

      //avoir le role
      this.authService.getuserbyusername(this.usernametoken).subscribe(file => {
        this.user = file

        if (this.user.role == "ROLE_ADMIN" || this.user.role == "ROLE_SUPER_ADMIN") {
          this.testNavig = true
        }
      })
    }
    if (this.testNavig = true) {
      //get users
      this.http.get<any>(path + "users/admins")
        .subscribe(
          (result) => {
            this.admins = result;
          },
          (error) => { console.log(error) }
        )
    }
    else
      this.router.navigate(['/']);
  }

  registerAdmin() {
    console.log(this.admin);
    this.http.post<any>(path + "users/save", this.admin)
      .subscribe(
        (result) => {
          window.location.reload();
        },
        (error) => {
          this.toastr.error("Email déjà utilisé");
        }
      )
  }

  userDelete(id: any) {
    this.http.delete(path + "users/" + id)
      .subscribe(() => this.status = 'Delete successful');
      window.location.reload();
  }

  getExperience(exp: any) {
    if (exp.value != "ROLE") {
      this.testRole = true;
      this.admin.role = exp.value;
    }
  }


}
