import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { path } from '../VariablesGlobales';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidat-register',
  templateUrl: './candidat-register.component.html',
  styleUrls: ['./candidat-register.component.css']
})
export class CandidatRegisterComponent implements OnInit {
  user: any = {};
  public erreur: String = ""
  public registerForm: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService) {
    let registerFormControls = {
      nom: new FormControl("", [
        Validators.required,
        Validators.pattern("[A-Z]*[a-z '.]*( [A-Z][a-z]*)*"),
        Validators.minLength(2)
      ]),
      prenom: new FormControl("", [Validators.required,
      Validators.pattern("[A-Z]*[a-z '.]*( [A-Z][a-z]*)*"),
      Validators.minLength(2)
      ]),
      username: new FormControl("", [Validators.required, Validators.email]),
      mdp: new FormControl("", [Validators.required, Validators.minLength(8)]),
      mdp1: new FormControl("", [Validators.required, Validators.minLength(8)])
    }
    this.registerForm = formBuilder.group(registerFormControls)
  }

  get nom() { return this.registerForm.get('nom') }
  get prenom() { return this.registerForm.get('prenom') }
  get username() { return this.registerForm.get('username') }
  get mdp() { return this.registerForm.get('mdp') }
  get mdp1() { return this.registerForm.get('mdp1') }

  ngOnInit(): void {
  }
  strUcFirst(a:any){return (a+'').charAt(0).toUpperCase()+a.substr(1);}

  registerCandidat() {
    this.user.nom=this.strUcFirst(this.user.nom);
    this.user.prenom=this.strUcFirst(this.user.prenom);
    this.user.role = "ROLE_CANDIDAT";
    
    this.http.post<any>(path + "users/save", this.user)
      .subscribe(
        (result) => {
          this.router.navigateByUrl('/Authentification');
        },
        (error) => {
          this.toastr.error("Compte existe deja!");
        }
      )
  }

}
