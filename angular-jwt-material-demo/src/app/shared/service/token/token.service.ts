import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Jwt } from "./jwt";

@Injectable({
  providedIn: "root"
})
export class TokenService {

  private jwt: Jwt;

  constructor(public jwtHelper: JwtHelperService) { }

  getJwt(): Jwt {
    if (!this.jwt) {
      const accessToken = localStorage.getItem("access_token");
      this.jwt = this.jwtHelper.decodeToken(accessToken);
    }
    return this.jwt;
  }

  clearJwt(): void {
    localStorage.removeItem("access_token");
    this.jwt = undefined;
  }

}
