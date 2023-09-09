import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { GuardService } from './services/guard.service';
import { CatalogScreenComponent } from './catalog-screen/catalog-screen.component';
import { MovieDetailScreenComponent } from './movie-detail-screen/movie-detail-screen.component';
import { WatchlistScreenComponent } from './watchlist-screen/watchlist-screen.component';

const routes: Routes = [
  {path: '', component: LoginScreenComponent},
  {path: 'catalog', canActivate: [GuardService],component: CatalogScreenComponent},
  {path: 'movie/:id', canActivate: [GuardService],component: MovieDetailScreenComponent},
  {path: 'watchlist', canActivate: [GuardService],component: WatchlistScreenComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
