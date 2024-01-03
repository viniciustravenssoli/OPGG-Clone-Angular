import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<header>
  <h1>{{ title }}</h1>
  <nav>
    <a routerLink="/pages/search">Pesquisar</a>
    <a routerLink="/pages/rank">Ranking</a>
  </nav>
</header>

<router-outlet></router-outlet>
  `,
  styles: [
    `
      header {
        background-color: #333;
        color: #fff;
        padding: 10px;
        text-align: center;
      }

      h1 {
        margin: 0;
      }

      nav {
        margin-top: 10px;
      }

      a {
        color: #fff;
        text-decoration: none;
        margin-right: 15px;
      }
    `,
  ]
})
export class AppComponent {
  title = 'OPRIOT';
}
