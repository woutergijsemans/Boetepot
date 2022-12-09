import { Component, Input, OnInit } from '@angular/core';
import { BusyService } from 'src/app/shared/busy.service';
import { Player, Team } from 'src/app/shared/model';
import { TeamService } from '../team.service';

@Component({
  selector: 'team-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private teamService: TeamService, private busyService: BusyService) { }

  @Input() team: Team;

  ngOnInit(): void {
  }

  public getHeadingId(player: Player, useAnchor: boolean, prefix: string = ''): string {
    const heading = `${useAnchor ? '#' : ''}${prefix}${player.id}`;
    return heading;
  }

}
