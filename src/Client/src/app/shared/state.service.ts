import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  public setAdmin(val: boolean): void {
    this.isAdmin.next(val);
  }
}
