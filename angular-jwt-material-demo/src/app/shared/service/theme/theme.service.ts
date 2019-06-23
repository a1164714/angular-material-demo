import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _theme: Subject<string> = new Subject();
  public theme = this._theme.asObservable();
  public selectIndex = 0;

  constructor() {
  }

  setTheme(theme: string, index: number) {
    this._theme.next(theme);
    this.selectIndex = index;
  }

}
