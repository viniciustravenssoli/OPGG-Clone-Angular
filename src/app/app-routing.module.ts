import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponentComponent } from './search-component/search-component.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
  {
    path: "pages/search",
    component: SearchComponentComponent,
  },{
    path: "pages/rank",
    component: RankingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
