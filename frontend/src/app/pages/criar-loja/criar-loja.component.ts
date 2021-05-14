import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Estado } from 'src/app/modelos/estado.model';
import { Loja } from 'src/app/modelos/loja.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { LojaService } from 'src/app/services/loja.service';
import { StorageService } from 'src/app/services/storage.service';
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
              private storageService: StorageService,
              private router: Router) { }


  ngOnInit(): void {
    this.utilitarioService.listarEstados().subscribe(response => {
      response.forEach(item => {
        this.estados.push(new Estado(item.id, item.nome, item.sigla));
      })
    })

    this.usuario = this.storageService.getLocalUser();

    this.categorias = [
      "Geral",
      "Restaurante",
      "Comércio local"
    ]
  }

  selectEstado(event){
    this.cidades = [];
    this.loja.uf = event.value;
    if(this.loja.uf){
      this.estados.forEach(item => {
        if(item.sigla === this.loja.uf){
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

  registrar(form){
    if(form.valid){
      this.loja.usuario = this.usuario;
      if(!this.loja.foto){
        return this.toastService.error("Adicione uma foto.", "Erro");
      }
      this.lojaService.create(this.loja, this.loja.foto).subscribe(response => {
        this.toastService.success("Loja criada com sucesso!", "Sucesso")
        this.router.navigate(["lojas"]);
      })
    }
  }

  selecionarFoto(event){
    this.loja.foto = event.currentFiles[0];
  }

}
