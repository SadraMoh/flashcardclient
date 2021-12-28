import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  constructor(
    private accountService: AccountService,
    private iab: InAppBrowser
  ) {}

  purchase(): void {
    const browser = this.iab.create('https://ionicframework.com/');
    browser.show();
  }

  signout(): void {
    this.accountService.signout()
  }

}
