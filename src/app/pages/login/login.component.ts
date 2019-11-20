import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { usuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:usuarioModel;
  recordarme:boolean = false;
  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.usuario = new usuarioModel();
    this.verificarRecordarEmail();
  }

  login(form:NgForm){
    if(!form.valid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    
    this.auth.login(this.usuario)
      .subscribe(resp => {
        Swal.close();
        this.recordarEmail();
        this.router.navigateByUrl('/home');
      }, (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      })
  }

  private recordarEmail(){
    if(this.recordarme){
      localStorage.setItem('email', this.usuario.email);
    }
  }

  private verificarRecordarEmail(){
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }
}
