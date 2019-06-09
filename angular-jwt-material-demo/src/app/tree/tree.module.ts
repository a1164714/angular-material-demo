import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { TreeComponent } from "./tree.component";

const routes: Routes = [
  { path: "", component: TreeComponent }
];

@NgModule({
  imports: [
    CommonModule, SharedModule, RouterModule.forChild(routes)
  ],
  declarations: [TreeComponent]
})
export class TreeModule { }
