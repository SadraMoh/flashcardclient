import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-download',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage implements OnInit {

  categories: Category[] = [];
  
  constructor(
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
      this.categoryService.get()
        .subscribe(
          res => {
            this.categories = res.value.filter(i => i.favoritesCount > 0);
          }
        )
  }

}
