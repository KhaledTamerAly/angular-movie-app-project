import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit{

  failureMessage: string | null = null;
  isLangEnglish: boolean = true;
  @ViewChildren('formRow') divs?: QueryList<ElementRef>;
  isEnglish?: boolean;

  constructor(private loginService: LoginService, 
    private renderer: Renderer2, 
    private router: Router, 
    private userService: UsersService, 
    public translate: TranslateService,
    private cd: ChangeDetectorRef){
  }
  ngOnInit()
  {
    this.userService.initUsers();
  }
  ngAfterViewInit()
  {
    this.setCurrentLang();
    this.cd.detectChanges();
  }
  setCurrentLang()
  {
    const currentLang = sessionStorage.getItem('lang');
    if(currentLang === null || currentLang === 'en')
    { 
      this.isEnglish = true;
      this.translate.use('en');
      this.divs?.forEach(div=>{
        this.renderer.setAttribute(div.nativeElement, 'dir', 'ltr');
      });
    }
    else
    {  
      this.isEnglish = false;
      this.translate.use('ar');
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
      sessionStorage.setItem('lang','ar');
      this.divs?.forEach(div=>{
        this.renderer.setAttribute(div.nativeElement, 'dir', 'rtl');
      });
    }
    else
    {  
      this.isEnglish = true;
      this.translate.use('en');
      sessionStorage.setItem('lang','en');
      this.divs?.forEach(div=>{
        this.renderer.setAttribute(div.nativeElement, 'dir', 'ltr');
      });
    }
  }
  submit(event: any)
  {
    const response: string = this.loginService.login(event.value);
    if(response === 'not found')
       this.translate.get(['FAILNOTEXISTS']).subscribe(trans => {
         this.failureMessage = trans.FAILNOTEXISTS;});
     else if(response === 'failure')
       this.translate.get(['FAILPASSWORD']).subscribe(trans => {
         this.failureMessage = trans.FAILPASSWORD;});
     else
       this.failureMessage = null;
  }
  
  switch()
  {
    this.router.navigate(['/signup']);
  }
}
