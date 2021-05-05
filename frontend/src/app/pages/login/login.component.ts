import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UsuarioLogin } from 'src/app/modelos/usuario-login.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();


  constructor(private usuarioService: UsuarioService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }


  login(form) {
    if (form.valid) {
      this.usuarioService.login(this.usuarioLogin).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário logado com sucesso!' });
      }, err => {
        if (err) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuário/Senha incorretos' });
        }
      })
    }
  }
}
