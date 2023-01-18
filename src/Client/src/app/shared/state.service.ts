import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private isAdminKey: string = 'isAdmin';

  constructor() { }

  public setAdmin(val: boolean): void {
    console.log('set isAdmin: ' + val);
    sessionStorage.setItem(this.isAdminKey, val.toString());
  }

  public isAdmin(): boolean {
    var value = sessionStorage.getItem(this.isAdminKey);
    console.log('get isAdmin: ' + value);
    return value !== null && value.toLowerCase() === 'true';
  }
}
