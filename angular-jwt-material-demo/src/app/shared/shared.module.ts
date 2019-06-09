import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { ConfirmDialogComponent } from "./component/confirm-dialog/confirm-dialog.component";
import { TreeDialogComponent } from "./component/tree/tree-dialog.component";
import { AppErrorHandler } from "./error/error-handler/app-error-handler.service";
import { HttpErrorInterceptor } from "./error/http-interceptors/http-error.interceptor";
import { MaterialComponentsModule } from "./module/material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialComponentsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialComponentsModule
  ],
  entryComponents: [ConfirmDialogComponent, TreeDialogComponent],
  declarations: [ConfirmDialogComponent, TreeDialogComponent],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
})
export class SharedModule { }
