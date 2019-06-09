import { Injectable, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "../notifications/notification.service";

/**
 * 异常处理
 */
@Injectable({
  providedIn: "root"
})
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    const displayMessage = "An error occurred:" + error.message;
    this.notificationsService.error(displayMessage);
    super.handleError(error);
  }
}
