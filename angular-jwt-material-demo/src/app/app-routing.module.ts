import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "todos", loadChildren: "./todo-list/todo-list.module#TodoListModule", canActivate: [AuthGuard] },
  { path: "users", loadChildren: "./user-list/user-list.module#UserListModule", canActivate: [AuthGuard] },
  { path: "tree", loadChildren: "./tree/tree.module#TreeModule"},
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "todos" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
