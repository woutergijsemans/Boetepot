import { Component, OnInit } from '@angular/core';
import { BusyService } from '../busy.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  public active: boolean = false;

  constructor(private busyService: BusyService) { }

  ngOnInit(): void {
    this.busyService.active.pipe(debounceTime(200)).subscribe((x) => {
      this.active = x;
      if (this.active) {
        document.querySelector('body').classList.add('overlayNoScroll');
      } else {
        document.querySelector('body').classList.remove('overlayNoScroll');
      }
    });
  }
}