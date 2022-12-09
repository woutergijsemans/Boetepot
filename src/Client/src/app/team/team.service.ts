import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl: string = 'api/boetepot/';
  constructor(private http: HttpClient) { }

  public getBySlug(slug: string): Observable<any> {
    //return this.http.get<any>(`api/boetepot/teams/${slug}`);
    return this.http.get<any>(`${this.baseUrl}teams/${slug}`);
  }
}
