import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificaService } from './notifica.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private notificaService: NotificaService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const erroServidor = error.error as {
          messages: Array<{text:string}>
        }
        console.log('ERRO DO SERVIDOR', erroServidor)

        if(error.error) {
          this.notificaService.criaError(error.error.message, `Error ${error.status}`)
        } else if(erroServidor?.messages?.[0]?.text){
          this.notificaService.criaError(erroServidor.messages[0].text, 'error')
        }
        return throwError(() => error)
      })
    );
  }
}
