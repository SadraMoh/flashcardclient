import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Signin } from 'src/app/models/account/Signin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild('form')
  ngForm: NgForm
  
  attempt: Signin = { telNo: '', password: '' };
  
  constructor() { }

  ngOnInit() {}

  login(): void {
    
  }

}
