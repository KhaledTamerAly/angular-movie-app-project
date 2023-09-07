import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogScreenComponent } from './catalog-screen/catalog-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { MovieDetailScreenComponent } from './movie-detail-screen/movie-detail-screen.component';
import { MoviesService } from './movies/movies.service';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from './login/guard.service';
import { UsersService } from './user/users.service';
import { WatchlistScreenComponent } from './watchlist-screen/watchlist-screen.component';

const routes: Routes = [
  {path: '', component: LoginScreenComponent},
  {path: 'catalog', canActivate: [GuardService],component: CatalogScreenComponent},
  {path: 'movie/:id', canActivate: [GuardService],component: MovieDetailScreenComponent},
  {path: 'watchlist', canActivate: [GuardService],component: WatchlistScreenComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    CatalogScreenComponent,
    LoginScreenComponent,
    MovieDetailScreenComponent,
    MovieCardComponent,
    WatchlistScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes),
  ],
  providers: [MoviesService, LoginService, GuardService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
