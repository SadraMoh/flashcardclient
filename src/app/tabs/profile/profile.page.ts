import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user/User';
import { PayService } from 'src/app/services/pay.service';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  user?: User;

  constructor(
    private accountService: AccountService,
    private iab: InAppBrowser,
    private pay: PayService
  ) { }

  async ngOnInit() {
    this.user = await this.accountService.getUser();
  }

  purchase(): void {

    this.pay.buy()
      .subscribe(res => {
        const browser = this.iab.create(res);
        browser.show();
      })
  }

  signout(): void {
    this.accountService.signout()
  }

}
