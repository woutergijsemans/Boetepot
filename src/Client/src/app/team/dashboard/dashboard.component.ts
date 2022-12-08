import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';

@Component({
  selector: 'team-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private teamService: TeamService) { }

  public team: any;
  ngOnInit(): void {
    this.teamService.getBySlug('vc-heist-herenthout').subscribe(x => {
      console.log(x);
      this.team = x;
    });
  }

}
