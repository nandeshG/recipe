import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from '../models/user';

export interface authInterface {
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  sub = new BehaviorSubject<any>(null);
  constructor(private http:HttpClient) { }   
  signUp(form:FormGroup){
   return this.http.post<authInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAP-NdtMD8-4dZxC4JXZqjZGERhTWidYZI',{
      email:form.get('email')?.value,
      password:form.get('password')?.value,
      returnSecureToken:true
    }).pipe(catchError(this.handleError),tap(authRes=>{
      this.handleAuthUser(authRes.email,authRes.localId,authRes.idToken,+authRes.expiresIn)
    } )
   )
  }

  signIn(form:FormGroup){
    return this.http.post<authInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAP-NdtMD8-4dZxC4JXZqjZGERhTWidYZI',{
      email:form.get('email')?.value,
      password:form.get('password')?.value,
      returnSecureToken:true
    }).pipe(catchError(this.handleError),tap(authRes=>{
      this.handleAuthUser(authRes.email,authRes.localId,authRes.idToken,+authRes.expiresIn)
    } ))
  }

  handleError(error:HttpErrorResponse){
    let errorMessage = 'An Unknown error'
      if(!error.error || !error.error.error){
       return throwError(errorMessage)
      }
      switch(error.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'this email already exist'
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'this email not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid Password'
          break;
      }
     return throwError(errorMessage)
  }

  handleAuthUser(email:string,localId:string,idToken:string,expiresIn:number){
    const expires = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email,localId,idToken,expires);
    this.sub.next(user)
  }

  logOut(){
    this.sub.next(null);
  }
}
