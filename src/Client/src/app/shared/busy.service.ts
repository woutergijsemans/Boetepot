import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  public active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  work() {
    counter++;
    this.active.next(true);
  }
  rest() {
    counter--;
    if (counter <= 0) {
      this.active.next(false);
      counter = 0;
    }
  }
  restAll() {
    this.active.next(false);
  }
}
let counter: number = 0;