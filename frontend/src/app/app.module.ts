import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { SplitterModule } from "primeng/splitter";
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { LojaService } from './services/loja.service';
import { UsuarioService } from './services/usuario.service';
import { UtilitarioService } from './services/utilitario.service';
import { LojasComponent } from './pages/lojas/lojas.component';
import { MenuComponent } from './componentes/menu/menu.component';
import {MenuModule} from 'primeng/menu';
import {TabMenuModule} from 'primeng/tabmenu';
import { StorageService } from './services/storage.service';
import { CriarLojaComponent } from './pages/criar-loja/criar-loja.component';
import { PanelModule } from 'primeng/panel';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CarouselModule} from 'primeng/carousel';
import {FileUploadModule} from 'primeng/fileupload';
import {DataViewModule} from 'primeng/dataview';
import {RatingModule} from 'primeng/rating';
import {ToggleButtonModule} from 'primeng/togglebutton'
import { ToastrModule } from 'ngx-toastr';
import { MinhasLojasComponent } from './pages/minhas-lojas/minhas-lojas.component';
import { DialogModule } from "primeng/dialog";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    LojasComponent,
    MenuComponent,
    CriarLojaComponent,
    MinhasLojasComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DividerModule,
    ButtonModule,
    SplitterModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    RippleModule,
    DropdownModule,
    CdkScrollableModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    MenuModule,
    TabMenuModule,
    PanelModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    InputMaskModule,
    InputTextModule,
    InputTextareaModule,
    CarouselModule,
    FileUploadModule,
    DataViewModule,
    RatingModule,
    DialogModule,
    ToggleButtonModule,
    ToastrModule.forRoot(),
  ],
  providers: [LojaService, UsuarioService, UtilitarioService, MessageService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
