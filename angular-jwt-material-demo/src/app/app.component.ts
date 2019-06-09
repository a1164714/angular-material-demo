import { Component } from "@angular/core";
import { AuthService } from "./login/auth.service";
import { Router } from "@angular/router";
import { TokenService } from "./shared/service/token/token.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router,
              private tokenService: TokenService) { }

  logout() {
    this.auth.logout();
    this.tokenService.clearJwt();
    this.router.navigate(["login"]);
  }
}
