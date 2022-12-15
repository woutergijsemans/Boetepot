import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Team } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) { }

  public getBySlug(slug: string): Observable<Team> {
    return this.http.get<Team>(`${environment.apiBaseUrl}teams/${slug}`).pipe(map(x => Team.fromDto(x)));
  }

  public getPenalties(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}teams/${slug}/penalties`);
  }

  public addPenaltyToPlayers(slug: string, penaltyId: string, playerIds: string[]): Observable<any> {
    const request = { playerIds, penaltyId, slug };
    return this.http.post<any>(`${environment.apiBaseUrl}teams/${slug}/players/penalty`, request);
  }

  public payPenalty(slug: string, playerId: string, playerPenaltyId: string): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}teams/${slug}/players/${playerId}/penalties/${playerPenaltyId}`, {});
  }
}
