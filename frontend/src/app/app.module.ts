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








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
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
  ],
  providers: [LojaService, UsuarioService, UtilitarioService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
