import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NotificationService } from "../../error/notifications/notification.service";
import { DynamicDatabase } from "./class/dynamic-database.inteface";
import { DynamicDataSource } from "./class/dynamic-datasource";
import { DynamicFlatNode } from "./class/dynamic-flat-node";

@Component({
  selector: "app-dialog-tree",
  templateUrl: "./tree-dialog.component.html",
  styleUrls: ["./tree-dialog.component.css"]
})
export class TreeDialogComponent implements OnInit {
  selectData;

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  constructor(
    public dialogRef: MatDialogRef<TreeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private database: DynamicDatabase,
    private notification: NotificationService
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      (node: DynamicFlatNode) => node.level,
      (node: DynamicFlatNode) => node.expandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, this.database);
  }

  async ngOnInit() {
    this.dataSource.data = await this.database.getRoot();
  }

  /**
   * 选择节点
   * 
   * @param $event radio选择
   */
  change($event) {
    this.selectData = $event.value;
  }

  /**
   * 确认按钮
   */
  confirm() {
    if (!this.selectData) {
      this.notification.warn("请选择节点.");
      return;
    }
    this.dialogRef.close(this.selectData);
  }

  /**
   * 取消按钮
   */
  cancel() {
    this.dialogRef.close(false);
  }

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

}
