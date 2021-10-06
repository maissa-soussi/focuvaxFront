import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { path } from '../VariablesGlobales';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  testNavig = false
  user: any
  public parametres: any
  public etatList: any[] = []

  bodyEmail = ""
  objetEmail = ""
  public mailForm: FormGroup

  etat = ""

  public token: any
  public tokenob: any
  public username: String = ""
  constructor(private router: Router, private authService: AuthService, public http: HttpClient, private formBuilder: FormBuilder, private toastr: ToastrService) {
    let mailFormControls = {
      mail: new FormControl("", [Validators.required]),
      objet: new FormControl("", [Validators.required])
    }
    this.mailForm = formBuilder.group(mailFormControls);
  }
  get mail() { return this.mailForm.get('mail') }
  get objet() { return this.mailForm.get('objet') }

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
      //get Parametres
      this.http.get<any>(path + "parametrages/1")
        .subscribe(
          (result) => {
            this.parametres = result;
            this.convertEtatToString();
          },
          (error) => { }
        )
    }
  }

  convertEtatToString() {
    this.etatList = this.parametres.etat.split("|");
    this.etatList = this.etatList.sort();
  }

  clickName() {
    this.bodyEmail = this.bodyEmail + " <nom>";
  }

  clickDate() {
    this.bodyEmail = this.bodyEmail + " <date>";
  }

  clickHeure() {
    this.bodyEmail = this.bodyEmail + " <heure>";
  }
  clickLieu() {
    this.bodyEmail = this.bodyEmail + " <lieu>";
  }
  mailSend() {
    if (this.etat != "" && this.bodyEmail != "" && this.objetEmail != "") {
      this.http.post<any>(path + "candidats/EmailSend/" + this.etat + "/" + this.objetEmail, this.bodyEmail)
        .subscribe(
          (result) => {
            this.toastr.success("Mails envoyés");

          },
          (error) => {
            this.toastr.error("Une erreur s'est produite");
          }
        )
    }
    else {
      if (this.etat == "")
        this.toastr.error("Choisir un état");
      else if (this.bodyEmail == "")
        this.toastr.error("Entrer du texte");
      else
        this.toastr.error("Entrer un objet");
    }


  }

  etatChange(e: any) {
    if (e.value != "Etat") {
      this.etat = e.value;
    }
  }
}
