import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) { }

  public getBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}teams/${slug}`);
  }

  public getPenalties(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}teams/${slug}/penalties`);
  }
}
