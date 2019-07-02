import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatTree } from "@angular/material";
import { NotificationService } from "../../error/notifications/notification.service";
import { DynamicDatabase } from "./class/dynamic-database.inteface";
import { DynamicDataSource } from "./class/dynamic-datasource";
import { DynamicFlatNode } from "./class/dynamic-flat-node";

@Component({
  selector: "app-dialog-tree",
  templateUrl: "./tree-dialog.component.html",
  styleUrls: ["./tree-dialog.component.scss"]
})
export class TreeDialogComponent implements OnInit {

  @ViewChild(MatTree) tree: MatTree<DynamicFlatNode>;

  selectData;

  treeControl: FlatTreeControl<DynamicFlatNode> = new FlatTreeControl<DynamicFlatNode>(
    (node: DynamicFlatNode) => node.level,
    (node: DynamicFlatNode) => node.expandable
  );

  dataSource: DynamicDataSource;
  database: DynamicDatabase;

  constructor(
    public dialogRef: MatDialogRef<TreeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private matDialogData: any,
    private notification: NotificationService
  ) {
    this.database = matDialogData.database;
    this.dataSource = new DynamicDataSource(this.treeControl, this.database);
  }

  async ngOnInit() {
    this.dataSource.data = this.matDialogData.data;
    if (this.dataSource.data.length > 0) {
      this.selectData = this.dataSource.data[0];
    }
    for (let i = 0; i < this.dataSource.data.length - 1; i++) {
      const node = this.dataSource.data[i];
      const next = this.dataSource.data[i + 1];
      if (node.level < next.level) {
        this.treeControl.expand(node);
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.item.hasChild;

  selectNode(node) {
    this.selectData = node;
  }
}
