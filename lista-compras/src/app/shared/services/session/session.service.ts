import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Session } from '../../models/session.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  setSession(session: Session){
    this.storage.set("session", JSON.stringify(session))
  }

  getSession(): Session {
    if (this.storage.get("session")) {
      return JSON.parse(this.storage.get("session"))
    }
  }
}
