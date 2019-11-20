import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyAftFAfL9T3UgzoyLO1hzuUhWtp7xf4Hbs';

  userToken:string = '';

  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http:HttpClient) {
    console.log("leer token");
    this.leerToken();
  }

  login(usuario:usuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
  }

  nuevoUsuario(usuario:usuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expiraEn', hoy.getTime().toString());
  }

  leerToken(){
    this.userToken = localStorage.getItem('token');
  }

  estaAutenticado(): boolean{
    const expira = Number(localStorage.getItem('expiraEn'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    console.log(expiraDate);
    console.log(new Date());
    console.log(expiraDate < new Date());
    return this.userToken.length > 2 && expiraDate > new Date();
  }
}
