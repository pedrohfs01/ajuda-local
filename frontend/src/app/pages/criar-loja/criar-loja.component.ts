import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Estado } from 'src/app/modelos/estado.model';
import { Loja } from 'src/app/modelos/loja.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { LojaService } from 'src/app/services/loja.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilitarioService } from 'src/app/services/utilitario.service';

@Component({
  selector: 'app-criar-loja',
  templateUrl: './criar-loja.component.html',
  styleUrls: ['./criar-loja.component.css']
})
export class CriarLojaComponent implements OnInit {


  estados: Estado[] = [];
  cidades: string[] = [];

  loja: Loja = new Loja();
  usuario: Usuario = new Usuario();

  categorias: string[];


  constructor(private utilitarioService: UtilitarioService,
    private lojaService: LojaService,
    private toastService: ToastrService,
    private usuarioService: UsuarioService,
    private storageService: StorageService,
    private router: Router) { }


  ngOnInit(): void {
    this.utilitarioService.listarEstados().subscribe(response => {
      response.forEach(item => {
        this.estados.push(new Estado(item.id, item.nome, item.sigla));
      })
    })

    this.usuarioService.getOne(this.storageService.getLocalUser().id).subscribe(r => this.usuario = r);

    this.categorias = [
      "Geral",
      "Papelarias",
      "Restaurante",
      "Hamburgaria",
      "Fast-food",
      "Mercado",
      "Auto-peças",
      "Salão de beleza",
      "Informática",
      "Padaria",
      "Pizzaria",
      "Loja de bebidas",
      "Shopping",
      "Academia"
    ]
  }

  selectEstado(event) {
    this.cidades = [];
    this.loja.uf = event.value;
    if (this.loja.uf) {
      this.estados.forEach(item => {
        if (item.sigla === this.loja.uf) {
          this.loja.estado = item.nome;
          this.utilitarioService.listarCidadePorUf(item.id).subscribe(response => {
            response.forEach(item => {
              this.cidades.push(item.nome);
            })
          })
        }
      })
    }
  }

  registrar(form) {
    if (form.valid) {
      this.loja.usuario = this.usuario;
      if (!this.loja.foto) {
        return this.toastService.error("Adicione uma foto.", "Erro");
      }
      if (this.testarPlanos() == false) {
        return this.toastService.error("Seu plano não permite adicionar mais lojas.", "Erro");
      }
      this.lojaService.create(this.loja, this.loja.foto).subscribe(response => {
        this.toastService.success("Loja criada com sucesso!", "Sucesso")
        this.router.navigate(["lojas"]);
      })
    }
  }

  selecionarFoto(event) {
    this.loja.foto = event.currentFiles[0];
  }

  testarPlanos(): boolean {
    console.log(this.usuario);

    switch (this.usuario.plano) {
      case "PLANO_COMUM":
        if(this.usuario.lojas.length >= 1){
          return false;
        }
        break;
      case "PLANO_BRONZE":
        if(this.usuario.lojas.length >= 3){
          return false;
        }
        break;
      case "PLANO_PRATA":
        if(this.usuario.lojas.length >= 5){
          return false;
        }
        break;
      case "PLANO_OURO":
        if(this.usuario.lojas.length >= 10){
          return false;
        }
        break;
      case "PLANO_DIAMANTE":
        return true;
        break;
      default:
        return false;
        break;
    }
  }

}
