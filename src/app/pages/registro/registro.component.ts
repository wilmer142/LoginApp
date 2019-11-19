import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: usuarioModel;

  constructor() { }

  ngOnInit() {
    this.usuario = new usuarioModel();
  }

  onSubmit(form:NgForm){
    console.log(form);
    if (!form.valid) { return; }
    console.log(this.usuario);
  }

}
