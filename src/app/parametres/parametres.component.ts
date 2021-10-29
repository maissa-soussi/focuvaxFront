import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { path } from '../VariablesGlobales';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  public ecoleList: any = []
  public diplomeList: any = []
  public etatList: any = []
  public specialiteList: any = []
  public experienceList: any = []
  public paysList: any = []
  public nb_Offres: any
  public parametres: any = {}
  public heures: any
  public lieux: any

  public testOffre = false

  // attributs pour l'ajout des parametres 
  public nvecole: any
  public nvspecialite: any
  public nvdiplome: any
  public nvetat: any
  public nvnbOffre: number = 0
  public nvpays: any
  public nvnbExp: any
  public nvheure: any = {}
  public nvlieu: any = {}
  status: string = ""
  testNavig = false
  user: any
  public token: any
  public tokenob: any
  public username: String = ""

  constructor(private router: Router, private authService: AuthService, public http: HttpClient, private toastr: ToastrService) { }

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
            this.convertObjToString();
          },
          (error) => {this.toastr.error("Pas de parametre, Veuillez remplir les données");  }
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
    }
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

  ajoutEcole(e: any) {
    if (e != "" && /^[a-z A-Z é è à É]+$/.test(e)) {
      if (this.ecoleList.length == 0) { this.ecoleList[0] = e; 
        this.nvecole = this.ecoleList.join("|");
      this.parametres.ecole = this.nvecole;
          console.log(this.parametres);
          
      this.http.post<any>(path + "parametrages/ecole", this.parametres)
        .subscribe(
          (result) => {
            window.location.reload();
          },
          (error) => {
          }
        )
      }
      else if (this.ecoleList.indexOf(e) < 0)
        {this.ecoleList[this.ecoleList.length] = e;
          this.nvecole = this.ecoleList.join("|");
      this.parametres.ecole = this.nvecole;
          console.log(this.parametres);
          
      this.http.post<any>(path + "parametrages/ecole", this.parametres)
        .subscribe(
          (result) => {
            window.location.reload();
          },
          (error) => {
          }
        )
        }
        else 
        this.toastr.error("Ecole existe déjà");
      
        

    }
    else 
    this.toastr.error("Valeur invalide");
  }

  ajoutSpecialite(e: any) {
    if (e != "" && /^[a-z A-Z é è à É]+$/.test(e)) {
      if (this.specialiteList.length == 0) { this.specialiteList[0] = e; 
        this.nvspecialite = this.specialiteList.join("|");
        this.parametres.specialite = this.nvspecialite;
  
        this.http.post<any>(path + "parametrages/specialite", this.parametres)
          .subscribe(
            (result) => {
              window.location.reload();
            },
            (error) => {
            }
          )
      }
      else if (this.specialiteList.indexOf(e) < 0)
        {this.specialiteList[this.specialiteList.length] = e;

      this.nvspecialite = this.specialiteList.join("|");
      this.parametres.specialite = this.nvspecialite;

      this.http.post<any>(path + "parametrages/specialite", this.parametres)
        .subscribe(
          (result) => {
            window.location.reload();
          },
          (error) => {
          }
        )}
        else 
        this.toastr.error("Spécialité existe déjà");
    }
    else 
    this.toastr.error("Valeur invalide");
  }

  ajoutDiplome(e: any) {
    if (e != "" && /^[a-z A-Z é è à É]+$/.test(e)) {
      if (this.diplomeList.length == 0) { this.diplomeList[0] = e; 
        this.nvdiplome = this.diplomeList.join("|");
        this.parametres.diplome = this.nvdiplome;
  
        this.http.post<any>(path + "parametrages/diplome", this.parametres)
          .subscribe(
            (result) => {
              window.location.reload();
            },
            (error) => {
            }
          )
      }
      else if (this.diplomeList.indexOf(e) < 0)
       { this.diplomeList[this.diplomeList.length] = e;

      this.nvdiplome = this.diplomeList.join("|");
      this.parametres.diplome = this.nvdiplome;

      this.http.post<any>(path + "parametrages/diplome", this.parametres)
        .subscribe(
          (result) => {
            window.location.reload();
          },
          (error) => {
          }
        )}
        else 
        this.toastr.error("Diplome existe déjà");
    }
    else 
    this.toastr.error("Valeur invalide");
  }

  ajoutEtat(e: any) {
    if (e != "") {
      if (this.etatList.length == 0) { this.etatList[0] = e; 
        this.nvetat = this.etatList.join("|");
        this.parametres.etat = this.nvetat;
  
        this.http.post<any>(path + "parametrages/etat", this.parametres)
          .subscribe(
            (result) => { window.location.reload();
            },
            (error) => {
            }
          )
      }
      else if (this.etatList.indexOf(e) < 0)
        {this.etatList[this.etatList.length] = e;

      this.nvetat = this.etatList.join("|");
      this.parametres.etat = this.nvetat;

      this.http.post<any>(path + "parametrages/etat", this.parametres)
        .subscribe(
          (result) => { window.location.reload();
          },
          (error) => {
          }
        )}
        else 
        this.toastr.error("Etat existe déjà");
    }
  }

  ajoutPays(e: any) {
    if (e != "" && /^[a-z A-Z é è à É]+$/.test(e)) {
      if (this.paysList.length == 0) { this.paysList[0] = e; 
        this.nvpays = this.paysList.join("|");
        this.parametres.pays = this.nvpays;
  
        this.http.post<any>(path + "parametrages/pays", this.parametres)
          .subscribe(
            (result) => {
              window.location.reload();
            },
            (error) => {
            }
          )
      }
      else if (this.paysList.indexOf(e) < 0)
        {this.paysList[this.paysList.length] = e;

      this.nvpays = this.paysList.join("|");
      this.parametres.pays = this.nvpays;

      this.http.post<any>(path + "parametrages/pays", this.parametres)
        .subscribe(
          (result) => {
            window.location.reload();
          },
          (error) => {
          }
        )}
        else 
        this.toastr.error("Pays existe déjà");
    }
    else 
    this.toastr.error("Valeur invalide");
  }


  ajoutExperience(e: any) {
    if (e != "") {
      if (this.experienceList.length == 0) { this.experienceList[0] = e;
        this.nvnbExp = this.experienceList.join("|");
        this.parametres.nb_annee_exp = this.nvnbExp;
  
        this.http.post<any>(path + "parametrages/exp", this.parametres)
          .subscribe(
            (result) => {
              window.location.reload();
            },
            (error) => {
            }
          )
      }
      else if (this.experienceList.indexOf(e) < 0)
        {this.experienceList[this.experienceList.length] = e;

      this.nvnbExp = this.experienceList.join("|");
      this.parametres.nb_annee_exp = this.nvnbExp;

      this.http.post<any>(path + "parametrages/exp", this.parametres)
        .subscribe(
          (result) => {
            window.location.reload();
          },
          (error) => {
          }
        )}
        else 
        this.toastr.error("Expérience existe déjà");
    }
  }

  ajoutNbOffres(e: any) {
    if (e != "" && ! isNaN(e) ) {
      if (this.nb_Offres == null) {
        this.nvnbOffre = e;
        this.parametres.nb_Offre = this.nvnbOffre;

        this.http.post<any>(path + "parametrages/nbOffres", this.parametres)
          .subscribe(
            (result) => {

              window.location.reload();
            },
            (error) => {
            }
          )

      }
    }
    else {
      this.toastr.error("Champ invalide");

    }
  }

  ajoutHeure(e: any) {
    if (e != "" && e.length<=6) {
      this.nvheure.valeur = e;

      this.http.post<any>(path + "heures", this.nvheure)
        .subscribe(
          (result) => {
            window.location.reload();
          },
          (error) => {
          }
        )
        
    }
    else {
      this.toastr.error("Champ invalide");

    }
    
  }

  ajoutLieu(e: any) {    
    if (e != "" && /^[a-z A-Z é è à É]+$/.test(e)) {
      this.nvlieu.valeur = e;
      this.http.post<any>(path + "lieux", this.nvlieu)
        .subscribe(
          (result) => {
            window.location.reload();
          },
          (error) => {
          }
        )

        
    }
    else 
    this.toastr.error("Valeur invalide");
  }

  lieuDelete(id: any) {
    this.http.delete(path + "lieux/" + id)
      .subscribe(() => this.status = 'Delete successful');
      window.location.reload();

  }

  heureDelete(id: any) {
    this.http.delete(path + "heures/" + id)
      .subscribe(() => this.status = 'Delete successful');
      window.location.reload();

  }



  ecoleDelete(par: any) {
    var ind = this.ecoleList.indexOf(par);
    this.ecoleList.splice(ind, 1);
    if (this.ecoleList != null) {
      this.nvecole = this.ecoleList.join("|");
      this.parametres.ecole = this.nvecole;
    } else
      this.parametres.ecole = null;

    this.http.post<any>(path + "parametrages/ecole", this.parametres)
      .subscribe(
        (result) => {
        },
        (error) => {
        }
      )

  }

  specialiteDelete(par: any) {
    var ind = this.specialiteList.indexOf(par);
    this.specialiteList.splice(ind, 1);
    if (this.specialiteList != null) {
      this.nvspecialite = this.specialiteList.join("|");
      this.parametres.specialite = this.nvspecialite;
    } else
      this.parametres.specialite = null;

    this.http.post<any>(path + "parametrages/specialite", this.parametres)
      .subscribe(
        (result) => {

        },
        (error) => {
        }
      )
  }

  diplomeDelete(par: any) {
    var ind = this.diplomeList.indexOf(par);
    this.diplomeList.splice(ind, 1);
    if (this.diplomeList != null) {
      this.nvdiplome = this.diplomeList.join("|");
      this.parametres.diplome = this.nvdiplome;
    } else
      this.parametres.diplome = null;

    this.http.post<any>(path + "parametrages/diplome", this.parametres)
      .subscribe(
        (result) => {

        },
        (error) => {
        }
      )
  }

  etatDelete(par: any) {
    var ind = this.etatList.indexOf(par);
    this.etatList.splice(ind, 1);
    if (this.etatList != null) {
      this.nvetat = this.etatList.join("|");
      this.parametres.etat = this.nvetat;
    } else
      this.parametres.etat = null;

    this.http.post<any>(path + "parametrages/etat", this.parametres)
      .subscribe(
        (result) => {
        },
        (error) => {
        }
      )
  }

  paysDelete(par: any) {
    var ind = this.paysList.indexOf(par);
    this.paysList.splice(ind, 1);
    if (this.paysList != null) {
      this.nvpays = this.paysList.join("|");
      this.parametres.pays = this.nvpays;
    } else
      this.parametres.pays = null;

    this.http.post<any>(path + "parametrages/pays", this.parametres)
      .subscribe(
        (result) => {
        },
        (error) => {
        }
      )
  }

  experienceDelete(par: any) {
    var ind = this.experienceList.indexOf(par);
    this.experienceList.splice(ind, 1);
    if (this.experienceList != null) {
      this.nvnbExp = this.experienceList.join("|");
      this.parametres.nb_annee_exp = this.nvnbExp;
    } else
      this.parametres.nb_annee_exp = null;

    this.http.post<any>(path + "parametrages/exp", this.parametres)
      .subscribe(
        (result) => {

        },
        (error) => {
        }
      )
  }

  nbOffreDelete() {
    this.nb_Offres = null;
    this.parametres.nb_Offre = null;

    this.http.post<any>(path + "parametrages/nbOffres", this.parametres)
      .subscribe(
        (result) => {

          window.location.reload();
        },
        (error) => {
        }
      )

  }

 


}
