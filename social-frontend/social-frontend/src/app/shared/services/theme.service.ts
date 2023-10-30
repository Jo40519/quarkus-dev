import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  changeTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement

    if(themeLink) {
      console.log('ESTOU SENDO CHAMADO???')
      themeLink.href = `${theme}.css`
    }
  }

}
