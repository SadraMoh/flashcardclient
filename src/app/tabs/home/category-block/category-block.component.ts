import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category } from 'src/app/models/category/Category';
import { User } from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss'],
})
export class CategoryBlockComponent implements OnInit {

  @Input('category')
  category: Category;

  @Input('favOnly')
  favOnly: boolean = false;

  constructor(
    public accountService: AccountService,
    private router: Router,
    public toastController: ToastController,
  ) { }

  ngOnInit() {

  }

  async click() {

    let user: User;

    try {
      user = await this.accountService.getUser();
    } catch (error) { }

    if (user?.isPermium) {
      this.router.navigate(['/', 'card', this.category.id], { queryParams: { favs: this.favOnly } })
      return;
    }

    if (this.category.isFree)
      this.router.navigate(['/', 'card', this.category.id], { queryParams: { favs: this.favOnly } })
    else {
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

}
