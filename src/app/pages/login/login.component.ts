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

  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.usuario = new usuarioModel();
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
}
