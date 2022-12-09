import { Component, OnDestroy, OnInit } from '@angular/core';
import { mergeMap, Observable, of, Subject, takeUntil } from 'rxjs';
import { BusyService } from './shared/busy.service';
import { TeamService } from './team/team.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  private slug: string = 'vc-heist-herenthout';
  constructor(private busyService: BusyService, private teamService: TeamService) { }

  public team: any;
  public penalties: any;

  ngOnInit(): void {
    this.busyService.work();
    this.getTeam().pipe(mergeMap(() => this.teamService.getPenalties(this.slug)), takeUntil(this.destroy)).subscribe((x) => {
      this.penalties = x;
      this.busyService.rest();
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  title = 'boetepot';
  public expanded: boolean = false;
  public addBoete: boolean = false;

  public showDashboard(): void {
    this.addBoete = false;
    this.expanded = false;
  }

  public showAddBoete(): void {
    this.addBoete = true;
    this.expanded = false;
  }

  private getTeam(): Observable<any> {
    return this.teamService.getBySlug(this.slug).pipe(mergeMap((x) => {
      this.team = x;
      return of({});
    }), takeUntil(this.destroy));
  }
}
