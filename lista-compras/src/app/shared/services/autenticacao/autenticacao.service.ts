import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../../models/usuario.interface';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: Usuario) {
    return this.http.post(`${environment.api}/usuario/inserir`, usuario)
  }

  login(usuario: Usuario){
    return this.http.post(`${environment.api}/autenticacao/login`, usuario)
  }
}
