import { Router } from '@angular/router';
import { AuthService } from './../../shard/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserLogin } from 'src/app/shard/models/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage: any;
  constructor(private auth: AuthService, private router: Router) { }
  formLogin = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email,]),
    password: new FormControl(null, [Validators.required,])
  })
  get email(): any {
    return this.formLogin.get("email")
  }
  get password(): any {
    return this.formLogin.get("password")
  }

  saveLogin() {
    let UserLogin: IUserLogin = {
      email: this.email.value,
      password: this.password.value,
    }
    this.auth.makeUserLogin(UserLogin).subscribe(
      (res: any) => {
        localStorage.setItem('id', res._id)
        if (res) {
          this.router.navigate([`user/orders/${res._id}`])
        }
      }, (err: any) => {
        if (err.status === 502) {
          this.errorMessage = err.error
        }
        if (err.status === 500) {
          this.errorMessage = err.error
        }
        if (err.status === 400) {
          this.errorMessage = err.error.error_en
        }
        if (err.status === 404) {
          this.errorMessage = err.error
        }
      }
    )
  }
  ngOnInit(): void {
  }

}
