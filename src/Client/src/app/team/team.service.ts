import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) { }

  public getBySlug(slug: string): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(`${environment.apiBaseUrl}teams/${slug}`, { headers });
  }
}
