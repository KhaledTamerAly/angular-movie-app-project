import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class LoginService {

    isLoggedIn: boolean = false;
    currentUser: {email: string, password: string} | null = null;

    constructor(private httpClient: HttpClient, private router: Router){}

    async login(credntials: {email: string, password: string})
    {
        const data = await this.httpClient.get('assets/Users.csv', {responseType: 'text'}).toPromise();
        const users = this.parseData(data);
        for(let user of users)
        {
            if(user.email === credntials?.email)
            {
                if(user.password === credntials?.password)
                {
                    this.isLoggedIn = true;
                    this.currentUser = {
                        email: credntials.email,
                        password: credntials.password
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
    getUser() {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user): null;
    }
    logout()
    {
        this.isLoggedIn = false;
        this.currentUser = null;
        sessionStorage.clear();
    }
    private parseData(data: any): {email: string, password: string}[]
    {
        let users:{email: string, password: string}[] = []
        const rows = data.split("\n");
        for(let i = 1; i<rows.length -1;i++)
        {
            let user = {
                email: rows[i].split(",")[0],
                password: rows[i].split(",")[1].replace("\r", "")
            }
            users.push(user);
        }
        return users;
    }
}