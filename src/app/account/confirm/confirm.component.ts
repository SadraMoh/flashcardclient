import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Confirm } from 'src/app/models/account/Confirm';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

  @ViewChild('auth')
  auth!: NgModel;

  get isValid(): boolean {
    return Boolean(this.auth?.valid);
  }

  attempt: Confirm = { auth: '' };

  /** is working in the background... */
  working: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() { }

  confirm() {
    this.accountService.confirm(this.attempt)
      .subscribe(
        async res => {
          (await this.toastController.create({
            color: "success",
            message: res.message,
            duration: 2000,
          })).present();
        },
        async rej => {
          (await this.toastController.create({
            color: "danger",
            message: rej,
            duration: 2000,
          })).present();
        }
      )
  }

}
