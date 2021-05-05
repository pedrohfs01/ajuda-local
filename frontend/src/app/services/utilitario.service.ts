import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilitarioService{
  constructor(private http: HttpClient) { }


  listarEstados(): Observable<any>{
    return this.http.get<any>("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
  }

  listarCidadePorUf(id: number): Observable<any>{
    return this.http.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
  }

}
