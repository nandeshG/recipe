import { Component, OnInit,OnDestroy } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { LoginServiceService } from './services/login-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{

  sub!:Subscription;
  title = 'recipeProject';
  isLogged = false;
  collapsed = true;
  constructor(private log:LoginServiceService,private router:Router){}
  ngOnDestroy(): void {
   this.sub.unsubscribe()
  }
  ngOnInit(): void {
    this.sub = this.log.sub.subscribe(res=>{
    this.isLogged = res ? true : false;
   })
  }

  logOut(){
    this.log.logOut()
    this.router.navigate([''])
  }
  
}
