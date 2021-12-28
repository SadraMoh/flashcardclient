import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Signup } from 'src/app/models/account/Signup';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  @ViewChild('fullName')
  fullName!: NgModel;

  @ViewChild('tel')
  tel!: NgModel;

  @ViewChild('password')
  password!: NgModel;


  get isValid(): boolean {
    return Boolean(this.tel?.valid && this.password?.valid && this.fullName?.valid);
  }

  attempt: Signup = { fullName: '', telNo: '', password: '' };

  /** is working in the background... */
  working: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() { }

  signUp(): void {
    this.working = true;
    this.accountService.signup(this.attempt)
      .subscribe(
        res => {
          this.router.navigate(['/', 'account', 'confirm'])
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
