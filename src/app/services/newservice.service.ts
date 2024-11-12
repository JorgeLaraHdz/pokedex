import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_NEWS } from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class NewserviceService {

  constructor(private http:HttpClient) { }

  public getNews():Observable<any>{
    return this.http.get(API_NEWS);
  }

}
