import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogScreenComponent } from './catalog-screen/catalog-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { MovieDetailScreenComponent } from './movie-detail-screen/movie-detail-screen.component';
import { MoviesService } from './services/movies.service';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GuardService } from './services/guard.service';
import { UsersService } from './services/users.service';
import { WatchlistScreenComponent } from './watchlist-screen/watchlist-screen.component';

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
  ],
  providers: [MoviesService, LoginService, GuardService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
