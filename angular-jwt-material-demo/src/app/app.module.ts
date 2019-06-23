import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";
import { AppRoutingModule } from "./app-routing.module";
import { SimpleLayoutComponent, FullLayoutComponent } from './containers';
import { AppHeaderComponent } from './shared/component/app-header/app-header.component';

export function customTokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    // Jwt相关配置
    JwtModule.forRoot({
      config: {
        // headerName: 'x-token',
        // authScheme: '',
        // skipWhenExpired: false,
        // throwNoTokenError: true,
        tokenGetter: customTokenGetter,
        whitelistedDomains: ["localhost:4000"],
        blacklistedRoutes: ["localhost:4000/api/auth"]
      }
    })
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
