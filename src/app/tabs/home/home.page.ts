import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/Category';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  query: string;

  categories: Category[]

  working: boolean = false;

  public get queriedCategories(): Category[] {
    if (!this.query) return this.categories;
    return this.categories?.filter(i => i.title?.toLowerCase().includes(this.query?.trim().toLowerCase()))
  }

  constructor(
    private categoryService: CategoryService,
    private account: AccountService,
    private db: DbService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.working = true;

    try {
      if ((await this.account.getUser()).isPermium)
        this.categories = await this.db.getCats();
    } catch (error) { }

    this.categoryService.get()
      .subscribe(
        async res => {
          this.categories = res.value;
          await this.db.setCats(res.value);
          this.working = false;
        }
      )
  }

}
