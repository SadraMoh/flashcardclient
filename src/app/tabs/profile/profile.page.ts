import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user/User';
import { PayService } from 'src/app/services/pay.service';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { UserService } from 'src/app/services/user.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  user?: User;

  currentVersion: number = 0;
  latestVersion: number = 0;

  premiumText: string;
  price: string;

  aboutText: string;
  contactText: string;

  public get newVersionAvailable(): boolean {
    return this.latestVersion > this.currentVersion;
  }

  working: boolean = false;

  constructor(
    private accountService: AccountService,
    private iab: InAppBrowser,
    private pay: PayService,
    private toastController: ToastController,
    private userService: UserService,
    private config: ConfigService,
    private db: DbService,
  ) { }

  async ngOnInit() {

    this.user = await this.accountService.getUser();

    Promise.all(
      [
        this.config.permiumText().then(i => this.premiumText = i),
        this.config.categoryPrice().then(i => this.price = i),
        this.config.aboutUsText().then(i => this.aboutText = i),
        this.config.contactUsText().then(i => this.contactText = i),
      ]
    )

    // check for update
    this.latestVersion = await this.config.dataversion();
    this.currentVersion = Number(await this.db.getVersion());

  }

  purchase() {

    this.pay.buy()
      .subscribe(res => {
        const browser = this.iab.create(res.url);
        browser.show();
        browser.on('exit').subscribe(i => {

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

  async updateDb() {
    await this.db.sourceOfTruth(true);
    await this.db.setVersion(this.latestVersion);
    this.currentVersion = this.latestVersion;
  }


}
