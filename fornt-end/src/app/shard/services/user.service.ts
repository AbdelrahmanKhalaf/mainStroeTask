import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getListOrderUser(id:string){
    return this.http.get(`http://localhost:3000/api/v1/order/${id}`)
  }
}
