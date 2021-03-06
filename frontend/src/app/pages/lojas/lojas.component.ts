import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { TabMenu } from 'primeng/tabmenu';
import { Estado } from 'src/app/modelos/estado.model';
import { Loja } from 'src/app/modelos/loja.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { LojaService } from 'src/app/services/loja.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilitarioService } from 'src/app/services/utilitario.service';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css']
})
export class LojasComponent implements OnInit {

  lojas: Loja[] = [];
  lojaVisualizar: Loja = new Loja();
  usuarioLogado: Usuario = new Usuario();

  estados: Estado[] = [];
  cidades: string[] = [];

  estadoSearch: Estado = new Estado(null, null, null);
  cidadeSearch: string = null;
  categoriaSearch: string = null;

  categorias: string[] = [];

  mostrarDialogVisualizar: boolean = false;

  valorRating: number = null;

  @ViewChild(DataView) dv: DataView;

  constructor(private lojaService: LojaService,
    private utilitarioService: UtilitarioService,
    private storageService: StorageService,
    private usuarioService: UsuarioService,
    private toastService: ToastrService) { }

  ngOnInit(): void {
    this.carregarLojas();
    this.carregarUsuario(this.storageService.getLocalUser().id);
    this.utilitarioService.listarEstados().subscribe(response => {
      response.forEach(item => {
        this.estados.push(new Estado(item.id, item.nome, item.sigla));
      })
    })

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

  carregarLojas() {
    this.lojaService.getAll().subscribe(response => {
      this.lojas = response;
      this.carregarRatingLojas();
    })
  }

  carregarRatingLojas() {
    let ratingTotal = 0;
    this.lojas.forEach(item => {
      item.ratings.forEach(rating => {
        ratingTotal += rating.rating;
      })
      item.ratingTotal = ratingTotal / item.ratings.length;
      ratingTotal = 0;
    })
    this.lojas.sort((a, b) => b.ratingTotal - a.ratingTotal);
  }


  selectEstado(event) {
    this.cidades = [];
    this.estadoSearch.sigla = event.value;
    if (this.estadoSearch.sigla) {
      this.estados.forEach(item => {
        if (item.sigla === this.estadoSearch.sigla) {
          this.estadoSearch.nome = item.nome;
          this.utilitarioService.listarCidadePorUf(item.id).subscribe(response => {
            response.forEach(item => {
              this.cidades.push(item.nome);
            })
          })
        }
      })
    }
  }

  pesquisar() {
    if (this.cidadeSearch === null && this.estadoSearch.nome === null && this.categoriaSearch === null) {
      return this.toastService.error("Selecione ao menos um estado, cidade ou categoria para pesquisar.")
    }
    if (this.categoriaSearch === null) {
      if (this.cidadeSearch === null) {
        this.lojaService.getAllByEstado(this.estadoSearch.nome).subscribe(response => {
          this.lojas = response;
          this.carregarRatingLojas();
          this.limpaCampos();
        })
      } else {
        this.lojaService.getAllByCidade(this.cidadeSearch).subscribe(response => {
          this.lojas = response;
          this.carregarRatingLojas();
          this.limpaCampos();
        })
      }
    } else {
      if (this.cidadeSearch === null) {
        this.lojaService.getAllByCategoria(this.categoriaSearch, this.estadoSearch.nome, null).subscribe(response => {
          this.lojas = response;
          this.carregarRatingLojas();
          this.limpaCampos();
        })
      } else {
        this.lojaService.getAllByCategoria(this.categoriaSearch, this.estadoSearch.nome, this.cidadeSearch).subscribe(response => {
          this.lojas = response;
          this.carregarRatingLojas();
          this.limpaCampos();
        })
      }
    }
  }

  limpaCampos() {
    this.estadoSearch = new Estado(null, null, null);
    this.cidadeSearch = null;
    this.categoriaSearch = null;
    this.cidades = [];
  }

  limpar(input) {
    this.carregarLojas();
    this.dv.filter('');
  }

  carregarUsuario(id: number) {
    if (id != null) {
      this.usuarioService.getOne(id).subscribe(r => {
        this.usuarioLogado = r;
      })
    }
  }

  carregarDadosDaLoja(id: number) {
    this.lojaService.getOne(id).subscribe(response => {
      this.lojaVisualizar = response;
    })
  }

  abrirModalVisualizar(id: number) {
    this.mostrarDialogVisualizar = true;
    this.carregarDadosDaLoja(id);
  }

  fecharModalVisualizar() {
    if (this.lojaVisualizar.id != null && this.usuarioLogado.id != null) {
      if (this.valorRating != null) {
        this.lojaService.rating(this.lojaVisualizar.id, this.usuarioLogado.id, this.valorRating).subscribe(r => {
          this.toastService.success("Avaliação dada com sucesso!");
          this.carregarLojas();
        });
      }
    }
    this.mostrarDialogVisualizar = false;
    this.lojaVisualizar = new Loja();
    this.valorRating = null;
  }

  doRating(valor: number) {
    this.valorRating = valor;
  }

  getPlano(plano: any) {
    switch (plano) {
      case "PLANO_BRONZE":
        return "Plano Bronze";
      case "PLANO_PRATA":
        return "Plano Prata";
      case "PLANO_OURO":
        return "Plano Ouro";
      case "PLANO_DIAMANTE":
        return "Plano Diamante";
      default:
        return "Plano Comum";
    }
  }

}
