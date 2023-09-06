import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

  failureMessage: string | null = null;

  constructor(private loginService: LoginService, private router: Router){
  }

  login(event: any) {
    this.loginService.login(event.value).then(response => {
      if(response === 'not found')
        this.failureMessage = "User does not exist."
      else if(response === 'failure')
        this.failureMessage = "Incorrect password."
      else
        this.failureMessage = null;
    });
  }
}
