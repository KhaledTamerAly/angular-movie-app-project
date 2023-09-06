import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-app-project';

  constructor(private loginService: LoginService, private router: Router)
  {
    const user = this.loginService.getUser();
    const path = sessionStorage.getItem('path');
    console.log(path);
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
