import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioLogin } from 'src/app/modelos/usuario-login.model';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();


  constructor(private usuarioService: UsuarioService,
    ) { }

  ngOnInit(): void {
  }


  login(form) {
    if (form.valid) {
      this.usuarioService.login(this.usuarioLogin);
    }
  }
}
