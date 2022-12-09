import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BusyService } from 'src/app/shared/busy.service';
import { Player, SelectableItem } from 'src/app/shared/model';
import { TeamService } from '../team.service';

@Component({
  selector: 'boete-toevoegen',
  templateUrl: './boete-toevoegen.component.html',
  styleUrls: ['./boete-toevoegen.component.css']
})
export class BoeteToevoegenComponent implements OnInit {
  private _selectablePlayers: SelectableItem<Player>[] = [];
  @Input() set players(val: Player[]) {
    this._selectablePlayers = val.map(p => new SelectableItem(p));
  }
  @Input() penalties: any;
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();
  @Output() saved: EventEmitter<any> = new EventEmitter<any>();

  public get selectablePlayers(): SelectableItem<Player>[] {
    return this._selectablePlayers;
  }
  public selectedPenalty: any;
  public penaltySelection: boolean = true;
  public playerSelection: boolean = false;
  constructor(private busyService: BusyService, private teamService: TeamService) { }

  ngOnInit(): void {
  }

  public toggleScreen(): void {
    this.penaltySelection = !this.penaltySelection;
    this.playerSelection = !this.playerSelection;
  }

  public resetScreen(): void {
    this.penaltySelection = true;
    this.playerSelection = false;
  }

  public cancelPenalties(): void {
    this.resetScreen();
    this.canceled.emit();
  }
  public savePenalties(): void {
    this.busyService.work();
    const selectedPlayersForPenalty = this._selectablePlayers.filter(p => p.selected).map(p => p.item.id);
    this.teamService.addPenaltyToPlayers('vc-heist-herenthout', this.selectedPenalty.id, selectedPlayersForPenalty).subscribe(() => {
      this.resetScreen();
      this.saved.emit();
      this.busyService.rest();
    });
  }

}
