import { ErrorHandler, Injectable } from '@angular/core';
import { HttpInterceptor, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators'; 
import { Post } from '../post.model';


const BASE_URL = 'https://dummyapi.io/data/api/';
const APP_ID = '6006dc7c501ed662007e8cfd';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object

  resolveItems(num : number): Observable<any> {
    console.log('Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API

    return this.http.get(BASE_URL+'post?page='+num+'&limit=1', { headers: { 'app-id': APP_ID } })
    .pipe(
      map((res: any) =>{
        console.log(res.data)
        return res.data
      })
    );
  }

  getTag(): Observable<any> {
    console.log('Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API

    return this.http.get(BASE_URL+'tag', { headers: { 'app-id': APP_ID } })
    .pipe(
      map((res: any) =>{
        console.log(res.data)
        return res.data
      })
    );
  }

  getCustomTag(key: string): Observable<any> {
    console.log('Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API

    return this.http.get(BASE_URL+'tag/'+key+'/post', { headers: { 'app-id': APP_ID } })
    .pipe(
      map((res: any) =>{
        console.log(res.data)
        return res.data
      })
    );
  }

}

