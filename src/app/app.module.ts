import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { AuthModule } from './authentication/auth.module';
import { SharedModule } from './shared/shared.module';
import { GuardService } from './authentication/guards/guard.service';
import { LoginService } from './services/login.service';
import { MoviesService } from './services/movies.service';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslate,
        deps: [HttpClient]
      }
    })
  ],
  providers: [GuardService, LoginService, MoviesService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslate(http: HttpClient)
{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
