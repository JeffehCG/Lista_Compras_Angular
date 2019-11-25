import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario.interface';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao/autenticacao.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private authService: AutenticacaoService,
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.validacaoFormulario()
  }

  validacaoFormulario(){
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)])
    })
  }

  login(){
    let usuario: Usuario = {
      login: this.loginForm.value.email,
      senha: this.loginForm.value.password
    }

    this.authService.login(usuario).subscribe(
      (data: any) => {
        this.session.setSession(data)
        this.router.navigate([''])
      },
      (error) => {
        console.log(error)
        window.alert("Erro ao cadastrar")
      }
    )
  }

}
