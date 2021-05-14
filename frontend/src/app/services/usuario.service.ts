import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsuarioLogin } from '../modelos/usuario-login.model';
import { Usuario } from '../modelos/usuario.model';
import { StorageService } from './storage.service';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  resourceUrl: string = environment.resourceUrl + "usuarios";

  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private toastService: ToastrService) { }


  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.resourceUrl, usuario).pipe(catchError((error: any) => {
      if(error.error.message === "emailexiste"){
        this.toastService.error("Email já existe!", "Erro")
        return throwError(error.status);
      }
    }));
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.resourceUrl, usuario);
  }

  getOne(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.resourceUrl + "/" + id);
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.resourceUrl);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + "/" + id);
  }

  login(usuarioLogin: UsuarioLogin) {
    this.http.post<Usuario>(this.resourceUrl + "/login", usuarioLogin).subscribe(response => {
      this.storageService.setLocalUser(response);
      this.toastService.success("Logado com sucesso!", "Sucesso");
    }, err => {
      if (err) {
        this.toastService.error("Erro ao fazer login. Credenciais incorreta.")
      }
    }, () => {
      this.router.navigate(["lojas"]);
    });
  }
}
