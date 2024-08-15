import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../AuthServices/auth.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Requests } from '../../Content/Donation/Donor-request/Requests';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient,private service:AuthService) { }

  private apiUrl='http://localhost:5087/api';
  private token = this.service.getToken();
  private headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
  
  private requestsSubject = new BehaviorSubject<Requests[]>([]);
  requests$ = this.requestsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  getPortFolio():Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/portfolio`,{headers:this.headers}).pipe(
      tap((requests) => this.requestsSubject.next(requests))
    );
  }

  postPortFolio(donorId:number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/portfolio/${donorId}`,null,{headers:this.headers})
  }

  getPortFolioById(donorId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/portfolio/${donorId}`,{headers:this.headers})
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/donor/${id}`,{headers:this.headers}).pipe(
      switchMap(() => this.getPortFolio()) // Refresh the list after deletion
    );
  }
  setLoading(state:boolean):void{
    this.loadingSubject.next(state);
  }
}
