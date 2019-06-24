import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./user-list.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  { path: "", component: UserListComponent }
];

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserListModule { }
