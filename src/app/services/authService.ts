import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { path } from '../VariablesGlobales';

const AUTH_API = path + 'login'

const httpOptions = {
    headers: new HttpHeaders({

        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    
    login(credentials: any): Observable<any> {
        const body = new HttpParams()
            .set('username', credentials.username)
            .set('password', credentials.mdp);
        return this.http.post(AUTH_API, body, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
        });
    }

getuserbyusername(username:any){

   return this.http.get("http://focuvax.focus-corporation.com:8081/myUser/"+username)

}

}