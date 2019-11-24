import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao/autenticacao.service';
import { Usuario } from 'src/app/shared/models/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validacaoFormulario()
  }

  validacaoFormulario(){
    this.cadastroForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)])
    })
  }

  cadastrarUsuario(){
    let usuario: Usuario = {
      login: this.cadastroForm.value.email,
      senha: this.cadastroForm.value.password
    }

    this.authService.cadastrarUsuario(usuario).subscribe(
      () => {
        this.router.navigate(["login"])
        window.alert("Cadastrado com sucesso")
      },
      (error) => {
        console.log(error)
        window.alert("Erro ao cadastrar")
      }
    )
  }

}
