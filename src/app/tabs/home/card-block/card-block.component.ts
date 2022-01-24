import { Component, Input, OnInit } from '@angular/core';
import { Router, ROUTER_INITIALIZER } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Card } from 'src/app/models/card/Card';
import { AccountService } from 'src/app/services/account.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent implements OnInit {

  @Input('card')
  card: Card

  constructor(
    private db: DbService,
    private account: AccountService,
    private router: Router,
    public toastController: ToastController,
  ) { }

  ngOnInit() { }

  async click() {
    const cat = await this.db.findCat(this.card.categoryId);
    if (cat.isFree) {
      this.router.navigate(['/', 'card', cat.id, this.card.id]);
      return;
    }

    const user = await this.account.getUser();

    if (user.isPermium) {
      this.router.navigate(['/', 'card', cat.id, this.card.id]);
      return;
    }

    const toast = (await this.toastController.create({
      color: "danger",
      message: "برای مشاهده این دسته بندی حساب پریمیوم لازم است",
      duration: 4000,
      buttons: [
        {
          side: 'end',
          cssClass: 'btn-toast-toaccount',
          icon: 'person-circle-outline',
          text: ' برو به حساب ',
          handler: () => {
            this.router.navigate(['/', 'tabs', 'profile' ]);
            toast.dismiss()
          }
        }
      ]
    }))
    toast.present();

  }

}
