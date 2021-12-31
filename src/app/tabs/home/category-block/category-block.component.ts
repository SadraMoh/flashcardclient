import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category } from 'src/app/models/category/Category';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss'],
})
export class CategoryBlockComponent implements OnInit {

  @Input('category')
  category: Category;

  constructor(
    public accountService: AccountService,
    private router: Router,
    public toastController: ToastController,
  ) { }

  ngOnInit() {

  }

  async click() {

    const user = await this.accountService.getUser();
    
    if(user?.isPremium) {
      this.router.navigate(['/', 'card', this.category.id])
      return;
    }
    
    if (this.category.isFree)
      this.router.navigate(['/', 'card', this.category.id])
    else {
      (await this.toastController.create({
        color: "danger",
        message: "برای مشاهده این دسته بندی حساب پریمیوم لازم است",
        duration: 4000,
      })).present();
    }
  }

}
