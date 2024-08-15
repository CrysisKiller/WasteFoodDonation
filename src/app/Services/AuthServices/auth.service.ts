import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient) { }
  private token = this.getToken();
  private headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}` );
  private apiUrl='http://localhost:5087/api';

  login(userName:string,password:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/Account/login`,{userName,password});
  }
  Register(username:string,password:string,email:string,PhoneNumber:Number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/Account/register`,{username,email,password,PhoneNumber});
  }
  getUserByID(userId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Account/${userId}`,{headers:this.headers});
  }
  sendMail(to:string,subject:string,body:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/sendmail`,{to,subject,body},{headers:this.headers});
  }
  

  logout(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('Name');
    sessionStorage.removeItem('Email');
    sessionStorage.removeItem('UserID');
  }

  setUserDetails(name:string,token: string,email:string,UserID:string,phone:string):void{
    sessionStorage.setItem('Name', name);
    sessionStorage.setItem('Email', email); 
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('UserID', UserID);
    sessionStorage.setItem('PhoneNumber',phone);
  }

  getUsername():string|null{
    return sessionStorage.getItem('Name');
  }
  getUserID():string|null{
    return sessionStorage.getItem('UserID');
  }

  getEMail():string|null{
    return sessionStorage.getItem('Email');
  }
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
  getPhone() : string | null{
    return sessionStorage.getItem('PhoneNumber');
  }
}
