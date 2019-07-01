import { Component, OnInit } from "@angular/core";
import { DynamicDatabaseImpl } from "./service/dynamic-database";
import { MatDialog } from '@angular/material';
import { TreeDialogComponent } from '../shared/component/tree/tree-dialog.component';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.css"]
})
export class TreeComponent implements OnInit {

  constructor(private database: DynamicDatabaseImpl, private dialog: MatDialog) {

  }

  matDialogData;

  async ngOnInit(): Promise<void> {
    this.matDialogData = await this.database.getRoot();
  }

  show() {
    console.log(this.matDialogData);
    const dialogRef = this.dialog.open(TreeDialogComponent, {
      data: { data: this.matDialogData, database: this.database }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }
}
