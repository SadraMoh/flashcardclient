import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  query: string;

  categories: Category[]

  public get queriedCategories(): Category[] {
    if (!this.query) return this.categories;
    return this.categories?.filter(i => i.title.toLowerCase().includes(this.query.trim().toLowerCase()))
  }


  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.categoryService.get()
      .subscribe(
        res => {
          this.categories = res.value;
        }
      )
  }

}
