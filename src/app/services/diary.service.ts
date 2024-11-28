import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private apiUrl = 'http://localhost:3000/diary';

  constructor(private http: HttpClient) {}

  createDiaryEntry(entry: any, token: string): Observable<any> {
    const headers = this.getAuthHeaders(token);
    return this.http.post(`${this.apiUrl}/create`, entry, { headers });
  }

  getDiaryEntries(token: string): Observable<any> {
    const headers = this.getAuthHeaders(token);
    return this.http.get(this.apiUrl, { headers });
  }

  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  

}
