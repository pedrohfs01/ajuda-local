import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Loja } from '../modelos/loja.model';


@Injectable({
  providedIn: 'root'
})
export class LojaService {
  resourceUrl: string = environment.resourceUrl + "lojas";

  constructor(private http: HttpClient,
    private toastService: ToastrService) { }


  create(loja: Loja, foto: File): Observable<Loja> {

    let body = new FormData();
    body.append('foto', foto);

    loja.foto = null;

    const json = JSON.stringify(loja);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    body.append('loja', blob);

    return this.http.post<Loja>(this.resourceUrl, body).pipe(catchError((error: any) => {
      if (error.error.message === "cnpjexiste") {
        this.toastService.error("CNPJ já existe!", "Erro")
        return throwError(error.status);
      } else if (error.error.message === "cnpjinvalido") {
        this.toastService.error("CNPJ Inválido", "Erro")
        return throwError(error.status);
      }
    }));
  }

  update(loja: Loja, foto?: File): Observable<Loja> {
    let body = new FormData();

    if (foto != null) {
      body.append('foto', foto);
    }

    loja.foto = null;

    const json = JSON.stringify(loja);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    body.append('loja', blob);

    return this.http.put<Loja>(this.resourceUrl, body);
  }

  getOne(id: number): Observable<Loja> {
    return this.http.get<Loja>(this.resourceUrl + "/" + id);
  }

  getAll(): Observable<Loja[]> {
    return this.http.get<Loja[]>(this.resourceUrl);
  }

  getAllByEstado(estado: string): Observable<Loja[]> {
    return this.http.get<Loja[]>(this.resourceUrl + "/estado?nome=" + estado);
  }

  getAllByCidade(cidade: string): Observable<Loja[]> {
    return this.http.get<Loja[]>(this.resourceUrl + "/cidade?nome=" + cidade);
  }

  getAllByUsuario(id: number): Observable<Loja[]> {
    return this.http.get<Loja[]>(this.resourceUrl + "/usuario/" + id);
  }

  getAllByCategoria(categoria: string, estado: string, cidade: string) : Observable<Loja[]> {
    let url = this.resourceUrl + "/categoria?";
    url += "categoria=" + categoria;

    if (cidade === null && estado !== null) {
      url += "&estado=" + estado;
    }
    if (cidade !== null) {
      url += "&cidade=" + cidade;
    }
    return this.http.get<Loja[]>(url);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + "/" + id);
  }

  rating(idLoja: number, idUsuario: number, valorRating: number): Observable<Loja> {
    return this.http.get<Loja>(this.resourceUrl + "/" + idLoja + "/" + idUsuario + "/" + valorRating);
  }

}
