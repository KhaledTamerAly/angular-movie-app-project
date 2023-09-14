import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './authentication/login-screen/login-screen.component';
import { SignUpScreenComponent } from './authentication/sign-up-screen/sign-up-screen/sign-up-screen.component';
const routes: Routes = [
  {path: '', component: LoginScreenComponent},
  {path: 'signup', component: SignUpScreenComponent},
  {path: 'catalog', loadChildren:()=> import('./core/core.module').then(mod => mod.CoreModule)},
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
