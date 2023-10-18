import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificaService {

  constructor(private messageService: MessageService) { }

  criaSucesso(mensagem: string, summary: string) {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: mensagem
    })
}
  criaError(mensagem: string, summary: string) {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: mensagem
    })
}
  criaWarning(mensagem: string, summary: string) {
    this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: mensagem
    })
}
  criaInfo(mensagem: string, summary: string) {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: mensagem
    })
}

}
