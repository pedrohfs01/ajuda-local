import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Estado } from 'src/app/modelos/estado.model';
import { Loja } from 'src/app/modelos/loja.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { LojaService } from 'src/app/services/loja.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilitarioService } from 'src/app/services/utilitario.service';

@Component({
  selector: 'app-minhas-lojas',
  templateUrl: './minhas-lojas.component.html',
  styleUrls: ['./minhas-lojas.component.css']
})
export class MinhasLojasComponent implements OnInit {

  lojas: Loja[] = [];
  lojaEditar: Loja = new Loja();
  usuarioLogado: Usuario;

  mostrarDialogEditar: boolean = false;
  mudouFoto: boolean = false;
  safeUrl;

  lojaIdDelete: number = null;

  categorias: string[];

  estados: Estado[] = [];
  cidades: string[] = [];

  @ViewChild(FileUpload) fileUpload: FileUpload;

  constructor(private lojaService: LojaService,
    private utilitarioService: UtilitarioService,
    private toastService: ToastrService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.storageService.getLocalUser();
    this.carregarLojas();

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

    this.utilitarioService.listarEstados().subscribe(response => {
      response.forEach(item => {
        this.estados.push(new Estado(item.id, item.nome, item.sigla));
      })
    })
  }

  carregarLojas() {
    if (this.usuarioLogado.id) {
      this.lojaService.getAllByUsuario(this.usuarioLogado.id).subscribe(response => {
        let ratingTotal = 0;
        this.lojas = response;
        this.lojas.forEach(item => {
          item.ratings.forEach(rating => {
            ratingTotal += rating.rating;
          })
          item.ratingTotal = ratingTotal / item.ratings.length;
          ratingTotal = 0;
        })
      })
    }
  }

  carregarDadosDaLoja(id: number) {
    this.lojaService.getOne(id).subscribe(response => {
      this.lojaEditar = response;
      this.selectEstado(this.lojaEditar.uf);
      this.lojaEditar.cidade = response.cidade;
    })
  }

  abrirModalEditar(id: number) {
    this.carregarDadosDaLoja(id);
    this.mostrarDialogEditar = true;
  }

  fecharModalEditar() {
    this.mostrarDialogEditar = false;
    this.lojaEditar = new Loja();
    this.fileUpload.files = [];
    this.fileUpload._files = [];
  }

  atualizar(form) {
    if (form.valid) {
      this.lojaService.update(this.lojaEditar, this.mudouFoto === true ? this.lojaEditar.foto : null).subscribe(r => {
        this.toastService.success("Loja atualizada com sucesso!", "Sucesso");
        this.carregarLojas();
        this.fecharModalEditar();
        this.mudouFoto = false;
      }, err => {
        this.toastService.error("Erro ao atualizar a loja. " + err);
      })

    }
  }

  selectEstado(uf) {
    this.cidades = [];
    this.lojaEditar.uf = uf;
    if (this.lojaEditar.uf) {
      this.estados.forEach(item => {
        if (item.sigla === this.lojaEditar.uf) {
          this.lojaEditar.estado = item.nome;
          this.utilitarioService.listarCidadePorUf(item.id).subscribe(response => {
            response.forEach(item => {
              this.cidades.push(item.nome);
            })
          })
        }
      })
    }
  }

  selecionarFoto(event) {
    this.mudouFoto = true;
    this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.currentFiles[0]));
    this.lojaEditar.foto = event.currentFiles[0];
  }

  deletarLoja(id: number) {
    this.showConfirm();
    this.lojaIdDelete = id;
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'info', summary: 'Você deseja deletar a loja?', detail: 'Confirme para prosseguir com a exclusão.' });
  }

  confirmarDelecao(){
    if(this.lojaIdDelete != null){
      this.lojaService.delete(this.lojaIdDelete).subscribe(r => {
        this.toastService.success("Loja excluída com sucesso!");
        this.lojaIdDelete = null;
        this.carregarLojas();
        this.cancelarDelecao();
      })
    }
  }

  cancelarDelecao(){
    this.messageService.clear("c");
  }
}
