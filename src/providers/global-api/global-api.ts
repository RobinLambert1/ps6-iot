import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Field} from "../../models/field";

@Injectable()
export class GlobalApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GlobalApiProvider Provider');
  }

  getRequest(url: string) {
    return this.http.get<Field>(url);
  }

  postRequest(url: string, body: any){
    return this.http.post<Field>(url, body);
  }

  putRequest(url: string, body: any){
    return this.http.put<Field>(url, body);
  }

  deleteRequest(url: string){
    return this.http.delete<Field>(url);
  }
}
