import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { LoginServiceService } from "../services/login-service.service";

@Injectable({
    providedIn:'root'
})


export class authGuard implements CanActivate{

    constructor(private log:LoginServiceService,private router:Router){}
    canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot):boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        return this.log.sub.pipe(
            take(1),
            map(res=>{
          const  authenticated = res ? true : false;
          if(authenticated){
            return true;
          }
          return this.router.createUrlTree([''])
        }))
        
    }
}