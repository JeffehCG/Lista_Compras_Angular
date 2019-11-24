import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../services/session/session.service';
import { ListasService } from '../../services/listas/listas.service';
import { Lista } from '../../models/lista.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent implements OnInit {

  listaForm: FormGroup
  listasUsuario: Array<Lista>

  constructor(
    private fb: FormBuilder,
    private session: SessionService,
    private listaService: ListasService,
    private router: Router) { }

  ngOnInit() {
    this.validacaoFormulario()
    this.getListasUsuario()
  }

  validacaoFormulario(){
    this.listaForm = this.fb.group({
      descricao: this.fb.control('', [Validators.required, Validators.minLength(3)])
    })
  }

  cadastrarLista(){
    let lista: Lista = {
      Descricao: this.listaForm.value.descricao,
      DataLista: new Date(),
      IdUsuario: this.session.getSession().identificador
    }

    this.listaService.cadastrarLista(lista).subscribe(
      () => {
        this.getListasUsuario()
        window.alert('Cadastrado com sucesso')
      },
      () => {
        window.alert("Erro ao cadastrar")
      }
    )
  }

  getListasUsuario(){
    this.listaService.getListasUsuario(this.session.getSession().identificador).subscribe(
      (data: any) => {
        this.listasUsuario = data
      },
      () => {
        window.alert("Erro inesperado")
      }
    )
  }

  deletarLista(idLista: number){
    this.listaService.deletarLista(idLista).subscribe(
      () => {
        this.getListasUsuario()
      },
      () => {
        window.alert("Erro ao deletar lista")
      }
    )
  }

  selecionarLista(id: number){
    this.router.navigate([`/${id}`])
  }

}
