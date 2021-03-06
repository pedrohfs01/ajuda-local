import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Estado } from 'src/app/modelos/estado.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilitarioService } from 'src/app/services/utilitario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  estados: Estado[] = [];
  cidades: string[] = [];

  usuario: Usuario = new Usuario();


  constructor(private utilitarioService: UtilitarioService,
              private usuarioService: UsuarioService,
              private toastService: ToastrService,
              private router: Router) { }


  ngOnInit(): void {

    this.utilitarioService.listarEstados().subscribe(response => {
      response.forEach(item => {
        this.estados.push(new Estado(item.id, item.nome, item.sigla));
      })
    })
  }

  selectEstado(event){
    this.cidades = [];
    this.usuario.uf = event.value;
    if(this.usuario.uf){
      this.estados.forEach(item => {
        if(item.sigla === this.usuario.uf){
          this.usuario.estado = item.nome;
          this.utilitarioService.listarCidadePorUf(item.id).subscribe(response => {
            response.forEach(item => {
              this.cidades.push(item.nome);
            })
          })
        }
      })
    }
  }

  registrar(form){
    if(form.valid){
      if(this.usuario.senha.length <= 4){
        return this.toastService.error("Digite mais de 4 caracteres na senha!")
      }
      this.usuarioService.create(this.usuario).subscribe(response => {
        this.toastService.success("Registrado com sucesso!", "Sucesso");
        this.telaLogin();
      });
    }
  }

  isEmpresario(event){
    this.usuario.empresario = event.checked;
  }


  telaLogin(){
    this.router.navigate(["login"]);
  }

}
