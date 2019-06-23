import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "./todo";
import { TodoService } from "./todo.service";
import { MatDialog } from "@angular/material";
import { TodoEditComponent } from "./todo-edit/todo-edit.component";
import { ConfirmDialogComponent } from "../shared/component/confirm-dialog/confirm-dialog.component";
import { NotificationService } from "../shared/error/notifications/notification.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  todo$: Observable<Todo[]>;
  displayedColumns: string[] = ["id", "name", "completed", "operation"];

  constructor(private todos: TodoService, public dialog: MatDialog, private notification: NotificationService) { }

  ngOnInit() {
    this.todo$ = this.todos.list();
  }

  /**
   * 编辑
   * @param todo 编辑对象
   */
  edit(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoEditComponent, {
      width: "250px",
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.list();
        this.notification.info("修改成功");
      }
    });
  }

  /**
   * 新增
   */
  add() {
    const dialogRef = this.dialog.open(TodoEditComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.list();
        this.notification.info("新增成功");
      }
    });
  }

  /**
   * 删除
   * @param todo 删除的节点
   */
  delete(todo: Todo) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // width: "250px",
      data: { header: "提示", content: `确认删除id为${todo.id}的代办任务吗?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todos.delete(todo.id).subscribe(res => {
          if (res["flag"]) {
            this.notification.info("删除成功");
            this.list();
          }
        });
      }
    });
  }

  /**
   * 获取todo列表
   */
  list() {
    this.todo$ = this.todos.list();
  }

}
