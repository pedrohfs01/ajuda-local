import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContextMenuService, MenuItem } from 'primeng/api';
import { TabMenu } from 'primeng/tabmenu';
import { Usuario } from 'src/app/modelos/usuario.model';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { LojasComponent } from 'src/app/pages/lojas/lojas.component';
import { LojaService } from 'src/app/services/loja.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterContentChecked{

  items: MenuItem[];

  usuarioLogado: Usuario;

  constructor(private storageService: StorageService,
    private toastService: ToastrService,
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
    }

  }


  ngOnInit(): void {
    this.items = [
      { label: 'Lojas', icon: 'pi pi-fw pi-plus', routerLink: ['/lojas'] },
      { label: 'Adicionar', icon: 'pi pi-fw pi-plus', routerLink: ["/criar-loja"] },
      { label: 'Minhas Lojas', icon: 'pi pi-fw pi-plus', routerLink: ["/minhas-loja"] },
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

}
