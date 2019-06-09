import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  public error: string;
  public user = { username: "", password: "" };

  constructor(private auth: AuthService, private router: Router) { }

  public submit() {
    this.auth
      .login(this.user.username, this.user.password)
      .pipe(first())
      .subscribe(result => this.router.navigate(["todos"]), err => (this.error = "Could not authenticate"));
  }
}
