import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StateService } from '../shared/state.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private route: ActivatedRoute, private stateService: StateService) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntil(this.destroy)).subscribe((queryParams) => {
      let slug = 'vc-heist-herenthout';

      if (queryParams.has('t')) {
        slug = queryParams.get('t');
      }

      let isAdmin = false;
      if (queryParams.has('a')) {
        const isAdminString = queryParams.get('a');
        isAdmin = isAdminString.toLowerCase() == 'true';
      }
      this.stateService.setAdmin(isAdmin);
      this.router.navigate([slug]);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
