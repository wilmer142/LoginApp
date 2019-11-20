import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: usuarioModel;

  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.usuario = new usuarioModel();
  }

  onSubmit(form:NgForm){
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authService.nuevoUsuario(this.usuario)
      .subscribe( result => {
        Swal.close();
        this.router.navigateByUrl('/home');
      }, (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error al registrar',
          text: err.error.error.message
        });
      });
  }

}
