import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private apiUrl = 'http://localhost:3000/posts/';
  constructor(private http: HttpClient) {
  }
  savePost(postData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, postData);
  }
  getUsersData(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}`, userData);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }
  saveUserWithFormData(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  updateUserWithFormData(userId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

}
