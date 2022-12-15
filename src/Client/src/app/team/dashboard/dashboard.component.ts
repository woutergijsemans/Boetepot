import { Component, Input, OnInit } from '@angular/core';
import { BusyService } from 'src/app/shared/busy.service';
import { Player, PlayerPenalty, PlayerWithInfo, Team } from 'src/app/shared/model';
import { TeamService } from '../team.service';

@Component({
  selector: 'team-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private teamService: TeamService, private busyService: BusyService) { }

  @Input() team: Team;
  @Input() slug: string;

  ngOnInit(): void {
  }

  public getHeadingId(player: Player, useAnchor: boolean, prefix: string = ''): string {
    const heading = `${useAnchor ? '#' : ''}${prefix}${player.id}`;
    return heading;
  }

  public payPenalty(penalty: PlayerPenalty, player: PlayerWithInfo): void {
    if (!penalty.isPaid) {
      this.busyService.work();
      this.teamService.payPenalty(this.slug, player.id, penalty.id).subscribe(() => {
        penalty.isPaid = true;
        player.penaltiesToPay = player.penaltiesToPay - 1;
        this.busyService.rest();
      });
    }

  }

}
