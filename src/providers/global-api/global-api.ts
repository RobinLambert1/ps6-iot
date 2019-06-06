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

  postRequest(url: string, body: any, header: any){
    return this.http.post<Field>(url, body, header);
  }

  putRequest(url: string, body: any, header: any){
    return this.http.put<Field>(url, body, header);
  }

  deleteRequest(url: string){
    return this.http.delete<Field>(url);
  }

  formRequest(method: any, url: string, body: any, header: any){
    if(method === "PUT"){
      console.log("gtest");
      return this.putRequest(url, undefined, header);
    }
    if(method === "POST"){
      return this.postRequest(url, undefined, header);
    }
  }
}
