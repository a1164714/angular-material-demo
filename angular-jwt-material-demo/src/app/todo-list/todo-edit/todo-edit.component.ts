import { Component, OnInit, Inject } from "@angular/core";
import { Todo } from "../todo";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { TokenService } from "src/app/shared/service/token/token.service";
import { Jwt } from "src/app/shared/service/token/jwt";
import { TodoService } from "../todo.service";
import { NotificationService } from 'src/app/shared/error/notifications/notification.service';

@Component({
  selector: "app-todo-edit",
  templateUrl: "./todo-edit.component.html",
  styleUrls: ["./todo-edit.component.scss"]
})
export class TodoEditComponent {

  public editData: Todo = new Todo();

  constructor(public dialogRef: MatDialogRef<TodoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Todo,
              private todoService: TodoService,
              private tokenService: TokenService,
              private notification: NotificationService) {
    if (data) {
      // 修改
      Object.assign(this.editData, data);
    } else {
      // 新增
      const jwt: Jwt = this.tokenService.getJwt();
      this.editData.userId = jwt.userId;
    }
  }

  /**
   * 返回
   */
  return(): void {
    this.dialogRef.close(false);
  }

  /**
   * 提交
   */
  submit(): void {
    this.todoService.update(this.editData).subscribe(res => {
      if (res && res["flag"]) {
        this.dialogRef.close(true);
      } else {
        this.notification.error("失败.");
      }
    });
  }

}
