import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { path } from '../VariablesGlobales';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-candidat-compte',
  templateUrl: './candidat-compte.component.html',
  styleUrls: ['./candidat-compte.component.css']
})
export class CandidatCompteComponent implements OnInit {
  candidat: any = {};
  public ecoleList: any[] = []
  public diplomeList: any[] = []
  public etatList: any[] = []
  public specialiteList: any[] = []
  public experienceList: any[] = []
  public paysList: any[] = []
  public nb_Offres: any
  public parametres: any
  public selectedCv: any
  public selectedPhoto: any
  public candidatForm: FormGroup
  public token: any
  public tokenob: any
  public username: String = ""
  public testOffre = false
  x: String = "Specialité"

  theUser: any = {}
  testNavig = false

  testSpecialite = false
  testEcole = false
  testDiplome = false
  testAnneeExp = false
  constructor(private formBuilder: FormBuilder, public http: HttpClient, private router: Router) {

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    let candidatFormControls = {
      tel: new FormControl("", [
        Validators.required
      ]),
      annee_Diplome: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ]),
      cv: new FormControl("", [
        Validators.required
      ]),
      linkedin: new FormControl("", [
        Validators.pattern(reg)
      ])
    }
    this.candidatForm = formBuilder.group(candidatFormControls)
  }


  get tel() { return this.candidatForm.get('tel') }
  get annee_Diplome() { return this.candidatForm.get('annee_Diplome') }
  get cv() { return this.candidatForm.get('cv') }
  get linkedin() { return this.candidatForm.get('linkedin') }

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
              if (this.candidat.id != null) { this.router.navigate(['/EspaceCandidat']); }
              else {
                this.router.navigate(['/MonCompte']);
              }

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
    } else
      this.router.navigate(['/']);
  }

  convertObjToString() {

    if (this.parametres.diplome != null) {
      this.diplomeList = this.parametres.diplome.split("|");
      this.diplomeList = this.diplomeList.sort();
    }
    if (this.parametres.ecole != null) {
      this.ecoleList = this.parametres.ecole.split("|");
      this.ecoleList = this.ecoleList.sort();
    }
    if (this.parametres.specialite != null) {
      this.specialiteList = this.parametres.specialite.split("|");
      this.specialiteList = this.specialiteList.sort();
    }
    if (this.parametres.etat != null) {
      this.etatList = this.parametres.etat.split("|");
      this.etatList = this.etatList.sort();
    }
    if (this.parametres.nb_annee_exp != null) {
      this.experienceList = this.parametres.nb_annee_exp.split("|");
      this.experienceList = this.experienceList.sort();
    }
    if (this.parametres.pays != null) {
      this.paysList = this.parametres.pays.split("|");
      this.paysList = this.paysList.sort();
    }
    if (this.parametres.nb_Offre != null) {
      this.nb_Offres = this.parametres.nb_Offre;
      this.testOffre = true
    }

  }


  onCvUpload(event: any) {
    this.selectedCv = event?.target.files[0];
  }

  onPhotoUpload(event: any) {
    this.selectedPhoto = event?.target.files[0];
  }

  addCandidat() {

    this.candidat.user = this.theUser;
    const formData = new FormData();
    formData.append('cv', this.selectedCv);
    formData.append('candidat', JSON.stringify(this.candidat))
    if(this.selectedPhoto != null)
    {
    formData.append('photo', this.selectedPhoto);
    this.http.post<any>(path + "candidats", formData)
      .subscribe(
        (result) => {

          this.router.navigateByUrl('/EspaceCandidat');
        },
        (error) => {
        }
      )
    }
    else {
      this.http.post<any>(path + "candidats/SansPhoto", formData)
      .subscribe(
        (result) => {

          this.router.navigateByUrl('/EspaceCandidat');
        },
        (error) => {
        }
      )

    }
    
    


  }

  getSpecialite(s: any) {
    if (s.value != "Spécialité") {
      this.candidat.specialite = s.value;
      this.testSpecialite = true;
    }

  }

  getDiplome(s: any) {
    if (s.value != "Diplôme") {
      this.candidat.diplome = s.value;
      this.testDiplome = true;
    }
  }

  getEcole(s: any) {
    if (s.value != "École") {
      this.candidat.ecole = s.value;
      this.testEcole = true;
    }
  }

  getAnneeExp(s: any) {
    if (s.value != "N° d'années d'expérience ( sans compter PFE)") {
      this.candidat.nb_annee_experience = s.value;
      this.testAnneeExp = true;
    }
  }


}
