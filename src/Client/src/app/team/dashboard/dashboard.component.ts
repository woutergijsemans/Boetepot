import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subject, takeUntil } from 'rxjs';
import { BusyService } from 'src/app/shared/busy.service';
import { Player, PlayerPenalty, PlayerWithInfo, Team } from 'src/app/shared/model';
import { StateService } from 'src/app/shared/state.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'team-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private teamService: TeamService, private busyService: BusyService, private stateService: StateService) { }

  public team: Team;
  private slug: string;
  private destroy: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.busyService.work();
    this.route.paramMap.pipe(
      mergeMap((paramMap) => {
        this.slug = paramMap.get('slug');
        return this.teamService.getBySlug(this.slug);
      }),
      takeUntil(this.destroy)).subscribe((team) => {
        this.team = team;
        this.busyService.rest();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  public getHeadingId(player: Player, useAnchor: boolean, prefix: string = ''): string {
    const heading = `${useAnchor ? '#' : ''}${prefix}${player.id}`;
    return heading;
  }

  public payPenalty(penalty: PlayerPenalty, player: PlayerWithInfo): void {
    if (!penalty.isPaid && this.stateService.isAdmin()) {
      this.busyService.work();
      this.teamService.payPenalty(this.slug, player.id, penalty.id).subscribe(() => {
        penalty.isPaid = true;
        player.penaltiesToPay = player.penaltiesToPay - 1;
        this.busyService.rest();
      });
    }

  }

}
