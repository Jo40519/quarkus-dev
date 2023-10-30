import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/autenticacao.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  isFixed = 'fixed-class';

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Verifique a posição da página
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    // Se a posição estiver no topo da página, remova a classe fixa
    if (scrollY === 0) {
      this.isFixed = '';
    } else {
      // Caso contrário, adicione a classe fixa
      this.isFixed = 'fixed-component w-full';
    }
  }
}
