import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// -> account
const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      // -
      { path: 'register', redirectTo: 'signup' },
      { path: 'signup', component: SignupComponent },
      // -
      { path: 'confirm/:telno', component: ConfirmComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AccountRoutingModule { }
