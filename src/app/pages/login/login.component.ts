import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:usuarioModel;

  constructor() { }

  ngOnInit() {
    this.usuario = new usuarioModel();
  }

  login(form:NgForm){
    if(!form.valid) { return; }

    console.log(this.usuario);
  }
}
