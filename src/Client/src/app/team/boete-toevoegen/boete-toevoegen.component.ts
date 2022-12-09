import { Component, Input, OnInit } from '@angular/core';
import { BusyService } from 'src/app/shared/busy.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'boete-toevoegen',
  templateUrl: './boete-toevoegen.component.html',
  styleUrls: ['./boete-toevoegen.component.css']
})
export class BoeteToevoegenComponent implements OnInit {
  @Input() penalties: any;
  public selectedPenalty: any;
  constructor(private busyService: BusyService, private teamService: TeamService) { }

  ngOnInit(): void {
  }

}
