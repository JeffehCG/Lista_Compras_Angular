import { Injectable } from '@angular/core';
import { Lista } from '../../models/lista.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(private http: HttpClient) { }

  cadastrarLista(lista: Lista){
    return this.http.post(`${environment.api}/listaCompra/inserir`, lista)
  }

  getListasUsuario(idUsuario: number){
    return this.http.get(`${environment.api}/listaCompra/listar?idusuario=${idUsuario}`)
  }

  deletarLista(idLista: number){
    return this.http.delete(`${environment.api}/listaCompra/deletar?id=${idLista}`)
  }
}
