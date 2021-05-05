import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Loja } from '../modelos/loja.model';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  resourceUrl: string = environment.resourceUrl + "lojas";

  constructor(private http: HttpClient) { }


  create(loja: Loja): Observable<Loja>{
    return this.http.post<Loja>(this.resourceUrl, loja);
  }

  update(loja: Loja): Observable<Loja>{
    return this.http.put<Loja>(this.resourceUrl, loja);
  }

  getOne(id: number): Observable<Loja>{
    return this.http.get<Loja>(this.resourceUrl + "/" + id);
  }

  getAll(): Observable<Loja[]>{
    return this.http.get<Loja[]>(this.resourceUrl);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.resourceUrl + "/" + id);
  }

}
