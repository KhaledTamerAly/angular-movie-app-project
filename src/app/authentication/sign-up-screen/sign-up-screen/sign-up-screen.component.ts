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
  @ViewChildren('formRow') divs?: QueryList<ElementRef>;
  isEnglish?: boolean;

  constructor(private loginService: LoginService, private renderer: Renderer2, private router: Router, private userService: UsersService, public translate: TranslateService){
  }
  ngOnInit()
  {
    this.userService.initUsers();
    this.setCurrentLang();
  }
  setCurrentLang()
  {
    if(this.translate.currentLang === 'en')
    { 
      this.isEnglish = true;
      this.divs?.forEach(div=>{
        this.renderer.setAttribute(div.nativeElement, 'dir', 'ltr');
      });
    }
    else
    {  
      this.isEnglish = false;
      this.divs?.forEach(div=>{
        this.renderer.setAttribute(div.nativeElement, 'dir', 'rtl');
      });
    }
  }
  changeLang()
  {
    if(this.translate.currentLang === 'en')
    {
      this.isEnglish = false;
      this.translate.use('ar');
      this.divs?.forEach(div=>{
        this.renderer.setAttribute(div.nativeElement, 'dir', 'rtl');
      });
    }
    else
    {  
      this.isEnglish = true;
      this.translate.use('en');
      this.divs?.forEach(div=>{
        this.renderer.setAttribute(div.nativeElement, 'dir', 'ltr');
      });
    }
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
    this.translate.use('en');
  }

}
