import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../models/user";

/*
  Generated class for the GlobalApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GlobalApiProvider Provider');
  }

  requestQrResult(url: string) {
    return this.http.get<User>(url)
  }
}
