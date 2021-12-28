import { Component, Input, OnInit } from '@angular/core';
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
    public accountService: AccountService
  ) { }

  ngOnInit() {

  }

}
