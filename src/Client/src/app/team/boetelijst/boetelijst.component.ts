import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, mergeMap, takeUntil } from 'rxjs';
import { BusyService } from 'src/app/shared/busy.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-boetelijst',
  templateUrl: './boetelijst.component.html',
  styleUrls: ['./boetelijst.component.css']
})
export class BoetelijstComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  constructor(private route: ActivatedRoute, private busyService: BusyService, private teamService: TeamService,) { }

  public penalties: any;
  ngOnInit(): void {
    this.busyService.work();
    this.route.paramMap.pipe(
      mergeMap((paramMap) => {
        const slug = paramMap.get('slug');
        return this.teamService.getPenalties(slug);
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

}
