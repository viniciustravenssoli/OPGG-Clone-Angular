import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="header">
      <h1>{{ title }}</h1>
      <nav>
        <a routerLink="/pages/search">Pesquisar</a>
      </nav>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'OPRIOT';
}
