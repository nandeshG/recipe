import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoginServiceService } from 'src/app/services/login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent  {
  isLogin = true;
  error = ''
  constructor(private fb:FormBuilder,private router:Router,private loginService:LoginServiceService){}
  form = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })

  signUp(form:FormGroup){
    console.log(form.value)
      if(!form.valid){
        return
      }
      if(this.isLogin){
        this.loginService.signIn(form).subscribe(res=>{
          console.log(res)
          this.router.navigate(['recipe']);
        },
        error=>{
          this.error = error;
        })
      }
      else{
        this.loginService.signUp(form).subscribe(res=>{
          this.router.navigate(['recipe']);
        },
        errorMassage=>{
          this.error = errorMassage;
        }
      );
      }
      
      this.form.reset();
      setTimeout(()=>this.error='',5000)
  }

  switchMode(){
  this.isLogin = !this.isLogin
  }
}
