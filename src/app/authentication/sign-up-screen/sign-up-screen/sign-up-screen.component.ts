import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up-screen',
  templateUrl: './sign-up-screen.component.html',
  styleUrls: ['./sign-up-screen.component.css']
})
export class SignUpScreenComponent {
  failureMessage: string | null = null;
  isLangEnglish: boolean = true;
  @ViewChildren('rootDiv') divs?: QueryList<ElementRef>;

  constructor(private loginService: LoginService, private renderer: Renderer2, private router: Router, private userService: UsersService, public translate: TranslateService){
  }
  ngOnInit()
  {
    this.userService.initUsers();
  }
  changeLang()
  {
    if(this.translate.currentLang === 'en')
      this.translate.use('ar');
    else
      this.translate.use('en');
  }
  submit(event: any)
  {
    const response: string = this.loginService.signup(event.value);
    if(response === 'exists')
       this.translate.get(['failAlreadyExists']).subscribe(trans => {
      this.failureMessage = trans.failAlreadyExists;
      ;});
    else
      { 
        this.failureMessage = null;
        this.switch();
      }
  }
  
  
  switch()
  {
    this.router.navigate(['']);
  }

}
