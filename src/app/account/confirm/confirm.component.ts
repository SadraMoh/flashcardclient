import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  attempt: Confirm = { auth: '', telNo: '' };

  /** is working in the background... */
  working: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    public toastController: ToastController,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.attempt.telNo = (this.route.snapshot.params["telno"])
  }

  confirm() {
    this.accountService.confirm(this.attempt)
      .subscribe(
        async res => {
          this.router.navigate(['/','account','login'])
        },
        async rej => {
          (await this.toastController.create({
            color: "danger",
            message: rej,
            duration: 4000,
          })).present();
        }
      )
  }

}
