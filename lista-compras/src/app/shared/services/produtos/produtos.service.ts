import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Produto } from '../../models/produto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  cadastrarProduto(produto: Produto){
    return this.http.post(`${environment.api}/Produto/inserir`, produto)
  }

  getListasUsuario(idLista: number){
    return this.http.get(`${environment.api}/Produto/listar?idLista=${idLista}`)
  }

  alterarEstadoProduto(produto: Produto){
    return this.http.put(`${environment.api}/Produto/alterar`, produto)
  }

  deletarLista(idProduto: number){
    return this.http.delete(`${environment.api}/Produto/deletar?id=${idProduto}`)
  }
}
