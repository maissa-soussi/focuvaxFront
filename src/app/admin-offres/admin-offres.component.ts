import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { path } from '../VariablesGlobales';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-admin-offres',
  templateUrl: './admin-offres.component.html',
  styleUrls: ['./admin-offres.component.css']
})
export class AdminOffresComponent implements OnInit {
  public offres: any[] = []
  public erreur: String = ""
  public offreForm: FormGroup
  public offreModifForm: FormGroup
  offreAjout: any = {};
  public parametres: any
  public experienceList: any[] = []
  public paysList: any[] = []
  public status: string = "";
  afficheOffre: any = {};
  ModifOffre: any = {};
  testExp = false;
  testPays = false;

  testNavig = false
  user: any
  public token: any
  public tokenob: any
  public username: String = ""

  constructor(private router: Router, private authService: AuthService, public http: HttpClient, private formBuilder: FormBuilder) {
    let offreFormControls = {
      ref: new FormControl("", [Validators.required]),
      titre: new FormControl("", [Validators.required]),
      profil: new FormControl("", [Validators.required]),
      mission: new FormControl("", [Validators.required])
    }
    this.offreForm = formBuilder.group(offreFormControls)

    let offreModifFormControls = {
      ref: new FormControl("", [Validators.required]),
      titre: new FormControl("", [Validators.required]),
      profil: new FormControl("", [Validators.required]),
      mission: new FormControl("", [Validators.required]),
      niveau_Exp: new FormControl("", [Validators.required]),
      pays: new FormControl("", [Validators.required])
    }
    this.offreModifForm = formBuilder.group(offreModifFormControls)
  }

  get ref() { return this.offreForm.get('ref') }
  get titre() { return this.offreForm.get('titre') }
  get profil() { return this.offreForm.get('profil') }
  get mission() { return this.offreForm.get('mission') }
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
      //get Offres
      this.http.get<any>(path + "offres")
        .subscribe(
          (result) => {
            this.offres = result;
          },
          (error) => { }
        )

      //get Parametres
      this.http.get<any>(path + "parametrages/1")
        .subscribe(
          (result) => {
            this.parametres = result;
            this.convertExpToString();
          },
          (error) => { }
        )
    }
    else
      this.router.navigate(['/']);
  }

  convertExpToString() {
    this.experienceList = this.parametres.nb_annee_exp.split("|");
    this.experienceList = this.experienceList.sort();
    this.paysList = this.parametres.pays.split("|");
    this.paysList = this.paysList.sort();
  }


  ajoutOffre() {
    this.http.post<any>(path + "offres", this.offreAjout)
      .subscribe(
        (result) => {
          window.location.reload();
        },
        (error) => {
        }
      )
  }

  modificationOffre(id: any) {
    console.log(this.ModifOffre);
    this.http.put<any>(path + "offres/" + id, this.ModifOffre)
      .subscribe(
        (result) => {
          window.location.reload();
        },
        (error) => {
        }
      )
  }


  offreDelete(id: any) {
    this.http.delete(path + "offres/" + id)
      .subscribe(() => this.status = 'Delete successful');
    window.location.reload();

  }

  offreModif(o: any) {
    this.ModifOffre = o;    
  }


  test(obj: any) {
    this.afficheOffre = obj;
  }

  getExperience(exp: any) {
    if (exp.value != "NIVEAU D'EXPERIENCE") {
      this.testExp = true;
      this.offreAjout.niveau_Exp = exp.value;

    }
  }

  getPays(exp: any) {
    if (exp.value != "PAYS") {
      this.testPays = true;
      this.offreAjout.pays = exp.value;
    }
  }
}
