import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../AuthServices/auth.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Requests } from '../../Content/Donation/Donor-request/Requests';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  constructor(private http:HttpClient,private service:AuthService) { }

  private apiUrl='http://localhost:5087/api';
  private token = this.service.getToken();
  private headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}` )

  private requestsSubject = new BehaviorSubject<Requests[]>([]);
  requests$ = this.requestsSubject.asObservable();



  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/donor`,{headers:this.headers}).pipe(
      tap((requests) => this.requestsSubject.next(requests))
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/donor/${id}`,{headers:this.headers}).pipe(
      switchMap(() => this.getAll()) // Refresh the list after deletion
    );
  }

  post(foodDetails:string,description:string,expDate:string,foodType:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/donor`,{foodDetails,description,expDate,foodType},{headers:this.headers});
  }

  postAddress(addressLine:string,state:string,city:string,pincode:number,DonorId:number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/address/${DonorId}`,{addressLine,state,city,pincode},{headers:this.headers});
  }


}
