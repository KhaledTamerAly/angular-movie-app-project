import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GuardService } from "../services/guard.service";
import { CatalogScreenComponent } from "./catalog-screen/catalog-screen.component";
import { HomeScreenComponent } from "./home-page-screen/home-screen/home-screen.component";
import { MovieDetailScreenComponent } from "./movie-detail-screen/movie-detail-screen.component";
import { WatchlistScreenComponent } from "./watchlist-screen/watchlist-screen.component";

const routes: Routes = [
  {
    path: '', 
    canActivate: [GuardService],
    component: HomeScreenComponent, 
    children:[
      {path: '', component: CatalogScreenComponent},
      {path: 'movie/:id', component: MovieDetailScreenComponent},
      {path: 'watchlist',component: WatchlistScreenComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
