import { AfterContentChecked, Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/modelos/usuario.model';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MenuComponent),
    }
  ]
})
export class MenuComponent implements OnInit, AfterContentChecked {

  items: MenuItem[];

  planos: any[] = [
    { label: "Plano comum", preco: 0.0, value: "PLANO_COMUM", permissao: "1" },
    { label: "Plano bronze", preco: 10.0, value: "PLANO_BRONZE", permissao: "3" },
    { label: "Plano prata", preco: 30.0, value: "PLANO_PRATA", permissao: "5" },
    { label: "Plano ouro", preco: 50.0, value: "PLANO_OURO", permissao: "10" },
    { label: "Plano diamante", preco: 100.0, value: "PLANO_DIAMANTE", permissao: "Ilimitada" },
  ]

  selecionadoPlano: any;

  usuarioLogado: Usuario;
  usuario: Usuario = new Usuario();

  mostrarDialogUsuario: boolean;
  mostrarDialogPlanos: boolean;

  constructor(private storageService: StorageService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private usuarioService: UsuarioService,
    private router: Router,) { }


  ngAfterContentChecked(): void {
    this.usuarioLogado = this.storageService.getLocalUser();
    if (this.usuarioLogado != null) {
      if (this.usuarioLogado.empresario === false) {
        this.items.forEach(item => {
          if (item.label === "Adicionar" || item.label === "Minhas Lojas") {
            item.visible = false;
          }
        })
      }
      else {
        this.items.forEach(item => {
          if (item.label === "Adicionar" || item.label === "Minhas Lojas") {
            item.visible = true;
          }
        })
      }
    }
  }


  ngOnInit(): void {
    this.items = [
      { label: 'Lojas', icon: 'pi pi-fw pi-bars', routerLink: ['/lojas'] },
      { label: 'Adicionar', icon: 'pi pi-fw pi-plus', routerLink: ["/criar-loja"] },
      { label: 'Minhas Lojas', icon: 'pi pi-fw pi-table', routerLink: ["/minhas-loja"] },
      {
        label: 'Usuário', icon: 'pi pi-user', command: () => {
          this.usuarioService.getOne(this.storageService.getLocalUser().id).subscribe(r => {
            this.usuario = r;
            this.selecionadoPlano = this.usuario.plano;
          });
          this.mostrarDialogUsuario = true;
        }, id: "Usuario"
      },
      { label: 'Sair', icon: 'pi pi-fw pi-sign-out', command: () => { this.logout(); } }
    ];
  }

  exibirMenu() {
    if (this.router.url != "/login" && this.router.url != "/registrar") {
      return true;
    } else {
      return false;
    }
  }



  logout() {
    this.toastService.info("Saindo da conta...")
    this.storageService.setLocalUser(null);
    this.router.navigate(["/login"]);
  }

  selecionarPlano(event) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja contratar o plano?',
      accept: () => {
        this.usuario.plano = this.selecionadoPlano;
        this.usuarioService.update(this.usuario).subscribe(r => {
        })
      }, reject: () => {
        this.selecionadoPlano = this.usuario.plano;
      }
    });
  }

  fecharModalEditar() {
    this.mostrarDialogUsuario = false;
  }

  abrirModalPlanos() {
    this.mostrarDialogPlanos = true;
  }
}
