import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ConnectionApiProvider {

  private url = 'http://127.0.0.1:9428/api/auth';
  public isConnected: boolean;
  public user: User;
  public isStudent: boolean;
  public isBRI: boolean;
  public isError: boolean;

  public connection$: BehaviorSubject<boolean> = new BehaviorSubject(this.isConnected);

  constructor(public http: HttpClient) {
    this.isConnected = localStorage.getItem('token') !== null;
    this.isBRI = false;
    this.isStudent = false;
    this.isError = false;
    this.connection$.next(this.isConnected);
  }

  connectWithCredientials(email: string, password: string) {
    this.isStudent = false;
    this.isBRI = false;
    const credientials = `${email}:${password}`;
    localStorage.setItem('token', credientials);

    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });

    this.http.get<User>(this.url, {"headers": header})
      .subscribe(res => {
        switch (res.role as string) {
          case 'student':
            this.isStudent = true;
            break;
          case 'bri':
            this.isBRI = true;
            break;
        }
        this.user = res;
        this.isConnected = true;
        this.isError = false;
        this.connection$.next(this.isConnected);
      }, () => {
        console.log("error");
        this.isConnected = false;
        this.isError = true;
        this.connection$.next(this.isConnected);
        localStorage.removeItem('token');
      });
  }
}
