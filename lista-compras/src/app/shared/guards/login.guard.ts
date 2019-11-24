import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Session } from '../models/session.interface';
import { SessionService } from '../services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  private session: Session

  constructor(private sessionService: SessionService, private router: Router) { }

  checarAutenticacao(): boolean {
    this.session = this.sessionService.getSession()

    if (this.session != undefined && "tokenJwt" in this.session && this.session.tokenJwt) {
      return true
    } else {
      this.router.navigate(['login'])
      return false
    }
  }

  canLoad(): boolean{
    return this.checarAutenticacao()
  }

  canActivate(): boolean {
    return this.checarAutenticacao();
  }
}
