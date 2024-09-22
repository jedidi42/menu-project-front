import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = 'http://localhost:3000/api/businesses'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  createBusiness(business: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, business);
  }

  getBusinessById(businessId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${businessId}`);
  }

  getAllBusinesses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  updateBusiness(businessId: number, business: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${businessId}`, business);
  }
}