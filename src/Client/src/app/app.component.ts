import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable, of, pipe, Subject, takeUntil } from 'rxjs';
import { BusyService } from './shared/busy.service';
import { Penalty, Player, Team } from './shared/model';
import { StateService } from './shared/state.service';
import { TeamService } from './team/team.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  public slug: string = 'vc-heist-herenthout';
  constructor(private route: ActivatedRoute, private stateService: StateService) { }

  ngOnInit(): void {
    //this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((paramMap) => this.slug = paramMap.get('slug'));
    this.stateService.isAdmin.subscribe((isAdmin) => this.canEdit = isAdmin);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  public expanded: boolean = false;
  public canEdit: boolean = false;
}
