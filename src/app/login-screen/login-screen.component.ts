import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit{

  failureMessage: string | null = null;
  isLangEnglish: boolean = true; 
  isLogin: boolean = true;
  @ViewChildren('rootDiv') divs?: QueryList<ElementRef>;

  constructor(private loginService: LoginService, private renderer: Renderer2, private router: Router, private userService: UsersService){
  }
  ngOnInit()
  {
    this.userService.initUsers();
  }
  changeLang()
  {
    this.isLangEnglish = !this.isLangEnglish;
    if(this.isLangEnglish)
    {
      this.divs?.forEach(div=>{
        this.renderer.setAttribute(div.nativeElement, 'dir', 'ltr');
      });
      if(this.failureMessage == ".المستخدم غير موجود")
        this.failureMessage = "User does not exist.";
      else if(this.failureMessage === ".كلمة سر خاطئة")
        this.failureMessage = "Incorrect password.";
    }
    else
    {
      this.divs?.forEach(div=>{
        this.renderer.setAttribute(div.nativeElement, 'dir', 'rtl');
      });
      if(this.failureMessage === "User does not exist.")
        this.failureMessage = ".المستخدم غير موجود";
      else if (this.failureMessage === "Incorrect password.")
        this.failureMessage = ".كلمة سر خاطئة";
    }
  }
  submit(event: any)
  {
    if(this.isLogin)
      this.login(event);
    else
      this.signup(event);
  }
  signup(event: any) {
    const response: string = this.loginService.signup(event.value);
    if(response === 'exists')
       this.failureMessage = this.isLangEnglish? "User already exist.": ".المستخدم موجود";
    else
      { 
        this.failureMessage = null;
        this.isLogin = true;
      }

   }
  login(event: any) {
    console.log(event);
   const response: string = this.loginService.login(event.value);
   if(response === 'not found')
      this.failureMessage = this.isLangEnglish? "User does not exist.": ".المستخدم غير موجود";
    else if(response === 'failure')
      this.failureMessage = this.isLangEnglish ? "Incorrect password.": ".كلمة سر خاطئة";
    else
      this.failureMessage = null;
  }
  switch()
  {
    this.isLogin = !this.isLogin;
  }
  getUpperButtonText()
  {
    if(this.isLogin)
    {
      if(this.isLangEnglish) 
        return 'Sign up'; 
      else
        return 'أفتح حساب';
    }
    else
    {
      if(this.isLangEnglish) 
        return 'Log in'; 
      else 
        return ' الدخول ';
    }
  }
  getBottomButtonText()
  {
    if(!this.isLogin)
    {
      if(this.isLangEnglish) 
        return 'Sign up'; 
      else
        return 'أفتح حساب';
    }
    else
    {
      if(this.isLangEnglish) 
        return 'Log in'; 
      else 
        return ' الدخول ';
    }
  }
}
