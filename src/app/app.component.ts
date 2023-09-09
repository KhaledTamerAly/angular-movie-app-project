import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'movie-app-project';

  constructor(private loginService: LoginService, private router: Router, private usersService: UsersService, private translate: TranslateService)
  {
  }

  ngOnInit(): void {
    this.initTranslation();
    this.usersService.initUsers();
    this.handlePageRefresh();
  }
  initTranslation()
  {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  handlePageRefresh()
  {
    const user = this.loginService.getUser();
    const path = sessionStorage.getItem('path');
    if(path && user)
    {
      this.loginService.currentUser = user;
      this.loginService.isLoggedIn = true;
      sessionStorage.setItem('user', JSON.stringify(user));
      this.router.navigate([path]);
    }
    if(!path && user)
    {
      this.loginService.login(user);
    }
  }
}
