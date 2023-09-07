
let users = [
    {id: 0, email: "k@gmail.com", password:"1234", watchlist: []},
    {id: 1, email: "a@gmail.com", password:"4321", watchlist: []},
    {id: 2, email: "m@gmail.com", password:"1111", watchlist: []},
];

export class UsersService 
{
    initUsers()
    {
        const u: any = sessionStorage.getItem('users');
        if(u === null)
            sessionStorage.setItem('users', JSON.stringify(users));
    }
    addUser(credentials: {email: string, password: string})
    {
        const u: any = sessionStorage.getItem('users');
        const users: any[] = JSON.parse(u);

        users.push({
            id: users.length,
            email: credentials.email,
            password: credentials.password,
            watchlist: []
        });
        sessionStorage.removeItem('users');
        sessionStorage.setItem('users', JSON.stringify(users));
    }
    getCurrentUser(): number
    {
        const u: any = sessionStorage.getItem('user');
        const user = JSON.parse(u);

        return user.id;
    }
    getUsers()
    {
        const u: any = sessionStorage.getItem('users');
        const users: any[] = JSON.parse(u);
        return users;
    }
    addToWatchlist(user_id: number, movie_id:number | undefined)
    {
        if(movie_id === undefined)
            return
        const u: any = sessionStorage.getItem('users');
        const users: any[] = JSON.parse(u);
        const watchlist: any[] = this.getWatchlist(user_id);
        if(!watchlist.includes(movie_id))
        {
            users[user_id].watchlist.push(movie_id);

            sessionStorage.removeItem('users');
            sessionStorage.setItem('users', JSON.stringify(users));
        }
    }
    getWatchlist(user_id: number)
    {
        const u: any = sessionStorage.getItem('users');
        const users: any[] = JSON.parse(u);

        return users[user_id].watchlist;
    }
}