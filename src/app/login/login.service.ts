import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../user/users.service';
@Injectable()
export class LoginService {

    isLoggedIn: boolean = false;
    currentUser: {id: number, email: string, password: string, watchlist: number[]} | null = null;

    constructor(private httpClient: HttpClient, private router: Router, private usersService: UsersService){}

    login(credntials: {email: string, password: string})
    {
        const users = this.usersService.getUsers();
        for(let user of users)
        {
            if(user.email === credntials?.email)
            {
                if(user.password === credntials?.password)
                {
                    this.isLoggedIn = true;
                    this.currentUser = {
                        id: user.id,
                        email: credntials.email,
                        password: credntials.password,
                        watchlist: user.watchlist
                    }
                    sessionStorage.setItem('user', JSON.stringify(this.currentUser));
                    sessionStorage.setItem('path', '/catalog');
                    this.router.navigate(['/catalog']);
                    return 'success';
                }
                else
                    return 'failure';
            }
        }
        return 'not found';
    }
    signup(credntials: {email: string, password: string})
    {
        const users = this.usersService.getUsers();
        for(let user of users)
        {
            if(user.email === credntials?.email)
            {
                return 'exists';
            }
        }
        this.usersService.addUser(credntials);
        return 'success';
    }
    getUser() {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user): null;
    }
    logout()
    {
        this.isLoggedIn = false;
        this.currentUser = null;
        sessionStorage.removeItem('path');
        sessionStorage.removeItem('user');
    }
}