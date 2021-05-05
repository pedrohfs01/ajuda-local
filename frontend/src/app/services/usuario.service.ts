import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioLogin } from '../modelos/usuario-login.model';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  resourceUrl: string = environment.resourceUrl + "usuarios";

  constructor(private http: HttpClient) { }


  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.resourceUrl, usuario);
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.resourceUrl, usuario);
  }

  getOne(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.resourceUrl + "/" + id);
  }

  getAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.resourceUrl);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.resourceUrl + "/" + id);
  }

  login(usuarioLogin: UsuarioLogin): Observable<Usuario> {
    return this.http.post<Usuario>(this.resourceUrl+"/login", usuarioLogin);
  }
}
