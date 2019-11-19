import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: usuarioModel;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.usuario = new usuarioModel();
  }

  onSubmit(form:NgForm){
    if (form.invalid) { return; }

    this.authService.nuevoUsuario(this.usuario)
      .subscribe( result => {
        console.log(result);
      }, (err) => {
        console.log(err.error.error.message);
      });
  }

}
