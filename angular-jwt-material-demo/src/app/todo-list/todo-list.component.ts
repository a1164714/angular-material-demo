import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../shared/component/confirm-dialog/confirm-dialog.component";
import { Page } from '../shared/dto/page';
import { NotificationService } from "../shared/error/notifications/notification.service";
import { Todo } from "./todo";
import { TodoEditComponent } from "./todo-edit/todo-edit.component";
import { TodoService } from "./todo.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  // 加载完成标志
  isLoadingResults = true;
  // 频繁访问标志
  isRateLimitReached = false;
  // 编辑对象
  selection: Todo = new Todo(); // 编辑对象
  // 分页对象
  page: Page<Todo> = { list: new Array<Todo>(), totalCount: 0, pageNum: 1, pageSize: 5 };
  // 展示列与名称映射
  columsMap = {
    id: "编号",
    name: "名称",
    completed: "完成"
  }
  // 展示列表
  displayedColumns: string[] = Object.keys(this.columsMap);

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
        const list = this.page.list;
        // 如果选中的行被清除则重新选择
        if (!list.find(item => item.id === this.selection["id"]) && this.page.list.length > 0) {
          this.selection = this.page.list[0];
        }
      }
    });
  }

  /**
   * 页码变更
   * @param $event 页码变更事件
   */
  changePage($event) {
    this.page.pageNum = $event.pageIndex + 1;
    this.page.pageSize = $event.pageSize;
    this.list();
  }

  /**
   * 选择行
   * @param $event 事件
   * @param row 行
   */
  changeSelection($event, row) {
    if ($event) {
      this.selection = row;
    }
  }
}
