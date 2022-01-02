import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { join } from '@fireflysemantics/join';
import { Observable, from, of, OperatorFunction } from 'rxjs';
import { Res, isResVaild } from '../models/Res';
import { User } from '../models/user/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Confirm } from '../models/account/Confirm';
import { Signin } from '../models/account/Signin';
import { Signup } from '../models/account/Signup';
import { Controller } from './controller';
import { UserService } from './user.service';
import { DbService } from './db.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService implements Controller {

  readonly route = join(environment.api, 'account');

  /** Get token from localStorage */
  public get token(): string | undefined {
    return localStorage.getItem('tkn') as string | undefined;
  }

  /** Store token in localStorage */
  public set token(v: string | undefined) {
    localStorage.setItem('tkn', v as string);
  }

  private readonly jwtHelper: JwtHelperService = new JwtHelperService();

  public get isJWTValid(): boolean {

    if (!this.token) return false;

    if (this.jwtHelper.isTokenExpired(this.token)) return false;

    return true;

  }

  public get loggedIn(): boolean {
    return this.isJWTValid;
  }

  public get tokenData(): object | undefined {
    return this.jwtHelper.decodeToken(this.token);
  }

  public async getUser(): Promise<User> {

    const res = await this.db.get('user');

    if (!res) {
      return new Promise<User>((res, rej) => {

        if(!this.loggedIn) {
          rej('tkn invalid or unavailable')
          return;
        }
        
        this.userService.find().subscribe(usr => {
          this.setUser(usr.value);
          res(usr.value);
        },
        () => rej())
      })
    };

    return JSON.parse(res) as User;

  };

  public setUser(v: User): Promise<string> {
    return this.db.set('user', JSON.stringify(v));
  }

  constructor(
    private client: HttpClient,
    private router: Router,
    private userService: UserService,
    private db: DbService
  ) { }

  /**
   * Login method
   * @param input Username, Password
   * @returns Username, JWT
   */
  signin(input: Signin): Observable<Res<Signin>> {
    const to = join(this.route, 'Signin');

    return from(new Promise<Res<Signin>>((res, rej) => {
      this.client.post<Res<Signin>>(to, input).subscribe(result => {
        if (isResVaild(result)) {
          this.token = result.value.token as string;
          // hydrate user data
          this.userService.find()
            .subscribe(res => this.setUser(res.value));
          res(result);
        }
        else
          rej(result.message);
      });
    }))
  }

  /**
   * Signup a new user
   * @param input Username, TelNo, Password
   * @returns all info about the user
   */
  signup(input: Signup): Observable<Res<Signup>> {
    const to = join(this.route, 'Signup');

    return from(new Promise<Res<Signup>>((res, rej) => {
      this.client.post<Res<Signup>>(to, input)
        .subscribe(
          result => {
            if (isResVaild(result))
              res(result);
            else
              rej(result.message);
          },
          err => {
            rej(err.error.errors.Password || err.err.errors.TelNo);
          });
    }));
  }

  /**
   * Confirm telephone number via auth
   * @param input telNo, auth
   * @returns telNo, auth
   */
  confirm(input: Confirm) {
    const to = join(this.route, 'Confirm');

    return from(new Promise<Res<Confirm>>((res, rej) => {
      this.client.post<Res<Confirm>>(to, input).subscribe(result => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      });
    }))
  }

  /**
   * Signout the user and clear their token, redirect to login page
   */
  signout() {
    this.token = "";
    this.setUser(undefined);
    this.router.navigateByUrl('/account/login');
  }

}

