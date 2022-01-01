import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user/User';
import { PayService } from 'src/app/services/pay.service';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  user?: User;

  working: boolean = false;

  constructor(
    private accountService: AccountService,
    private iab: InAppBrowser,
    private pay: PayService,
    private toastController: ToastController,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.user = await this.accountService.getUser();
  }

  purchase() {

    this.pay.buy()
      .subscribe(res => {
        const browser = this.iab.create(res.url);
        browser.show();
        browser.on('exit').subscribe(i => {
          console.log(i);

          // check if payment was successful
          this.userService.find()
            .subscribe(
              async usr => {
                if (usr.value.isPermium) {

                  // upgrade user to premium
                  const user: User = await this.accountService.getUser();
                  user.isPermium = true;
                  await this.accountService.setUser(user);

                  (await this.toastController.create({
                    color: "success",
                    message: "تبریک! اکانت شما هم اکنون پریمیوم می باشد",
                    duration: 3000,
                  })).present();

                }
                else {
                  // prompt user of error
                  (await this.toastController.create({
                    color: "danger",
                    message: "پرداخت ناموفق" + usr.message + usr.value.fullName + usr.value.id + usr.value.isPermium + usr.value.telNo,
                    duration: 3000,
                  })).present();
                }
              }
            )

        })
      })
  }

  signout(): void {
    this.accountService.signout()
  }

}
