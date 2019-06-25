import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "./todo";
import { TodoService } from "./todo.service";
import { MatDialog } from "@angular/material";
import { TodoEditComponent } from "./todo-edit/todo-edit.component";
import { ConfirmDialogComponent } from "../shared/component/confirm-dialog/confirm-dialog.component";
import { NotificationService } from "../shared/error/notifications/notification.service";
import { Page } from '../shared/dto/page';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  isLoadingResults = true;
  isRateLimitReached = false;

  selection: Todo; // 编辑对象

  page: Page<Todo> = { list: new Array<Todo>(), totalCount: 0, pageNum: 1, pageSize: 5 };
  todo$: Todo[] = [];
  displayedColumns: string[] = ["select", "id", "name", "completed"];

  constructor(private todos: TodoService, public dialog: MatDialog, private notification: NotificationService) { }

  ngOnInit() {
    this.list();
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
      data: { header: "提示", content: `确认删除id为${todo.id}的代办任务吗?` }
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
    this.isLoadingResults = true;
    this.todos.list(this.page.pageNum.toString(), this.page.pageSize.toString()).subscribe(res => {
      if (res.code === "SUC000000") {
        this.page = res.result;
        this.isLoadingResults = false;
        if (!this.selection && this.page.list.length > 0) {
          this.selection = this.page.list[0];
        }
      }
    });
  }

  changePage($event) {
    this.page.pageNum = $event.pageIndex + 1;
    this.page.pageSize = $event.pageSize;
    this.list();
  }

  changeSelection($event, row) {
    if ($event) {
      this.selection = row;
    }
  }
}
