import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const token = this.jwtHelper.decodeToken(accessToken);
      console.log(token);
      if (new Date().getTime() < token.exp * 1000) {
        return true;
      }
    }

    this.router.navigate(["login"]);
    return false;
  }
}
