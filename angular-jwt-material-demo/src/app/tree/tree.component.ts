import { Component, OnInit } from "@angular/core";
import { DynamicDatabaseImpl } from "./service/dynamic-database";
import { MatDialog } from '@angular/material';
import { TreeDialogComponent } from '../shared/component/tree/tree-dialog.component';

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.css"]
})
export class TreeComponent implements OnInit {

  constructor(private database: DynamicDatabaseImpl, private dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  show() {
    const dialogRef = this.dialog.open(TreeDialogComponent, {
      data: this.database
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }
}
