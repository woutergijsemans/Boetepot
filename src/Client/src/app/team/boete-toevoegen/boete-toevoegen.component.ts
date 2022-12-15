import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusyService } from 'src/app/shared/busy.service';
import { Player, SelectableItem } from 'src/app/shared/model';
import { TeamService } from '../team.service';
import { mergeMap, Observable, of, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'boete-toevoegen',
  templateUrl: './boete-toevoegen.component.html',
  styleUrls: ['./boete-toevoegen.component.css']
})
export class BoeteToevoegenComponent implements OnInit, OnDestroy {
  private _selectablePlayers: SelectableItem<Player>[] = [];
  public penalties: any;
  private destroy: Subject<boolean> = new Subject<boolean>();

  public get selectablePlayers(): SelectableItem<Player>[] {
    return this._selectablePlayers;
  }
  public selectedPenalty: any;
  public penaltySelection: boolean = true;
  public playerSelection: boolean = false;
  constructor(private route: ActivatedRoute, private busyService: BusyService, private teamService: TeamService, private router: Router) { }

  private slug: string;
  ngOnInit(): void {
    this.busyService.work();
    this.route.paramMap.pipe(
      mergeMap((paramMap) => {
        this.slug = paramMap.get('slug');
        return this.teamService.getPlayers(this.slug);
      }),
      mergeMap((players) => {
        this._selectablePlayers = players.map(x => new SelectableItem(x));
        return this.teamService.getPenalties(this.slug)
      }),
      takeUntil(this.destroy),
    ).subscribe((penalties) => {
      this.penalties = penalties;
      this.busyService.rest();
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
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
    this.goToDashboard();
  }
  public savePenalties(): void {
    this.busyService.work();
    const selectedPlayersForPenalty = this._selectablePlayers.filter(p => p.selected).map(p => p.item.id);
    this.teamService.addPenaltyToPlayers('vc-heist-herenthout', this.selectedPenalty.id, selectedPlayersForPenalty).subscribe(() => {
      this.busyService.rest();
      this.goToDashboard();
    });
  }
  private goToDashboard(): void {
    this.router.navigate(['..']);
  }

}
