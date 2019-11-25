import { Component, OnInit } from '@angular/core';
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto.interface';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ProdutosService } from '../../services/produtos/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtoForm: FormGroup
  idLista: number
  produtosLista: Array<Produto> = []

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private produtoService: ProdutosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLista()
    this.verificarAlteracaoLista()
    this.validacaoFormulario()
  }

  getLista() {
    this.idLista = parseInt(this.route.snapshot.params.idLista)
    this.getProdutosLista()
  }

  validacaoFormulario() {
    this.produtoForm = this.fb.group({
      nome: this.fb.control('', [Validators.required, Validators.minLength(3)])
    })
  }

  verificarAlteracaoLista() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if(event.url != "/login" && event.url != "/cadastro")
        setTimeout(() => {
          this.getLista()
        }, 100);
      }
    });
  }

  cadastrarProduto() {
    let produto: Produto = {
      Nome: this.produtoForm.value.nome,
      Comprado: false,
      IdLista: this.idLista
    }

    this.produtoService.cadastrarProduto(produto).subscribe(
      () => {
        this.getProdutosLista()
        window.alert("Cadastrado com sucesso")
      },
      () => {
        window.alert("Erro ao cadastrar produto")
      }
    )
  }

  getProdutosLista() {
    if (this.idLista) {
      this.produtoService.getProdutosLista(this.idLista).subscribe(
        (data: any) => {
          this.produtosLista = data
        },
        () => {
          window.alert("Erro ao procurar produtos")
        }
      )
    }
  }

  deleteProduto(id: number) {
    this.produtoService.deletarProduto(id).subscribe(
      () => {
        this.getProdutosLista()
      },
      () => {
        window.alert("Erro ao deletar produto")
      }
    )
  }

  alterarEstadoProduto(produto: Produto) {
    produto.Comprado = !produto.Comprado
    this.produtoService.alterarEstadoProduto(produto).subscribe(
      () => {
        this.getProdutosLista()
      },
      () => {
        window.alert("Erro ao confirmar produto")
      }
    )
  }

}
