import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../core/globalConstant/Global.constant';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj: any = {
    userName: '',
    password: '',
  };

  router =  inject(Router);

  constructor(private http: HttpClient) {

  }


  onLogin() {
    debugger;
    this.http.post(environment.API_URL + "login",this.loginObj).subscribe({
      next:(response:any)=>{
         debugger;
        if(response.result) {
          alert("User Found");
          localStorage.setItem(GlobalConstant.LOGIN_LOCAL_KEY,JSON.stringify(response.data));
          this.router.navigateByUrl("/admin/dashboard"); 
        } else {
          alert(response.message);
        }
      },
      error:(err:any)=>{
         debugger;
         alert("API Error")
      }
    })
  }
}
