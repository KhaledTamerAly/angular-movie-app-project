import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable()
export class GuardService implements CanActivate{

    constructor(private loginService: LoginService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        if(this.loginService.isLoggedIn)
            return true;
        else
        {
            this.router.navigate(['']);
            return false;
        }
    }

}