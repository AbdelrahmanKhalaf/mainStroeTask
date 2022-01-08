import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../models/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  makeUserLogin(login: IUserLogin) :Observable<any>{
    return this.http.post("http://localhost:3000/api/v1/auth/login", login,
    )
  }
}
