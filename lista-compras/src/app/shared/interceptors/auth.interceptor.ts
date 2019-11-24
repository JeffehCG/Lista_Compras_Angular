
// Angular Imports
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpHeaders } from '@angular/common/http';

// Configuration
import { environment } from '../../../environments/environment';
import { SessionService } from '../services/session/session.service';
import { Session } from '../models/session.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private session: SessionService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const session: Session = this.session.getSession();

        if (session && session.tokenJwt) {
            const authToken = session.tokenJwt
            const typeToken = 'Bearer'

            const headers = new HttpHeaders({
                // 'Authorization': `Bearer ${authToken}`
                'Authorization': `${typeToken} ${authToken}`
            });

            const authReq = req.clone({ headers });
            return next.handle(authReq);
        } else {
            return next.handle(req)
        }
    }

}
