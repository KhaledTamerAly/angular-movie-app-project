import { NgModule } from "@angular/core";
import { LoginScreenComponent } from "./login-screen/login-screen.component";
import { SignUpScreenComponent } from "./sign-up-screen/sign-up-screen/sign-up-screen.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { createTranslate } from "../app.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
      CommonModule,
      FormsModule, 
      HttpClientModule,
      TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslate,
            deps: [HttpClient]
          }
      })],
    providers:[],
    declarations: [LoginScreenComponent, SignUpScreenComponent]
})
export class AuthModule {

    constructor(){}
}