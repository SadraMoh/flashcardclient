import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { User } from 'src/app/models/user/User';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  user?: User;
  
  constructor(
    private accountService: AccountService,
    private iab: InAppBrowser
  ) { }

  async ngOnInit() {
    this.user = await this.accountService.getUser();
  }

  purchase(): void {
    const browser = this.iab.create('https://ionicframework.com/');
    browser.show();
  }

  signout(): void {
    this.accountService.signout()
  }

}
