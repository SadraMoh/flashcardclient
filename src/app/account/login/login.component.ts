import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Signin } from 'src/app/models/account/Signin';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild('tel')
  tel!: NgModel;

  @ViewChild('password')
  password!: NgModel;

  get isValid(): boolean {
    return Boolean(this.tel?.valid && this.password?.valid);
  }

  attempt: Signin = { telNo: '', password: '' };

  /** is working in the background... */
  working: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() { }

  login(): void {
    this.working = true;
    this.accountService.signin(this.attempt)
      .subscribe(
        res => {
          this.router.navigate(['/', 'tabs', 'home'])
        },
        async rej => {
          (await this.toastController.create({
            color: "danger",
            message: rej,
            duration: 2000,
          })).present();
        },
        () => {
          this.working = false;
        }
      )
  }

}
