import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/service/token/token.service';
import { ThemeService } from 'src/app/shared/service/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  theme$: Observable<string>;
  themes: Array<any> = [
    { label: "默认", value: "default-theme" },
    { label: "日间", value: "light-theme" },
    { label: "黑夜", value: "black-theme" },
    { label: "自然", value: "nature-theme" }
  ];
  selectTheme;

  stickyHeader$ = false;

  constructor(public auth: AuthService, private router: Router,
    private tokenService: TokenService,
    private themeService: ThemeService,
    private overlayContainer: OverlayContainer) {

  }

  ngOnInit(): void {
    this.selectTheme = this.themes[this.themeService.selectIndex];
    this.theme$ = this.themeService.theme;
  }

  logout() {
    this.auth.logout();
    this.tokenService.clearJwt();
    this.router.navigate(["login"]);
  }

  themeChange($event, i) {
    if ($event.isUserInput) {
      const themeVal = $event.source.value;
      this.themeService.setTheme(themeVal, i);
      const classList = this.overlayContainer.getContainerElement().classList;
      if (classList.replace) {
        this.overlayContainer.getContainerElement().classList.replace(classList[classList.length - 1], themeVal);
      } else {
        console.log(this.overlayContainer.getContainerElement());
        this.overlayContainer.getContainerElement().className = "cdk-overlay-container " + themeVal;
      }
    }
  }
}
