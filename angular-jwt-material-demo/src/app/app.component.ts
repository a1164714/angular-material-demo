import { Component } from "@angular/core";
import { AuthService } from "./login/auth.service";
import { Router } from "@angular/router";
import { TokenService } from "./shared/service/token/token.service";
import { Observable } from 'rxjs';
import { ThemeService } from './shared/service/theme/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  theme$: Observable<string>;
  themes: Array<any> = [
    { label: "默认", value: "default-theme" },
    { label: "日间", value: "light-theme" },
    { label: "黑夜", value: "black-theme" },
    { label: "自然", value: "nature-theme" }
  ];

  constructor(public auth: AuthService, private router: Router,
    private tokenService: TokenService,
    private themeService: ThemeService,
    private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    this.themeService.setTheme("default-theme", 0);
    this.theme$ = this.themeService.theme;
    this.overlayContainer.getContainerElement().classList.add("default-theme");
  }

  logout() {
    this.auth.logout();
    this.tokenService.clearJwt();
    this.router.navigate(["login"]);
  }
}
