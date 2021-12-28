import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  declarations: [AccountLayoutComponent ,SignupComponent, LoginComponent, ConfirmComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    AccountRoutingModule,
    UtilityModule
  ],
  
})
export class AccountModule { }
