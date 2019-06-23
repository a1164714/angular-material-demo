import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./login/login.component";
import { FullLayoutComponent } from './containers';

const routes: Routes = [
  {
    path: "",
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: "todos",
        loadChildren: "./todo-list/todo-list.module#TodoListModule",
        canActivate: [AuthGuard]
      },
      { path: "users", loadChildren: "./user-list/user-list.module#UserListModule", canActivate: [AuthGuard] },
      { path: "tree", loadChildren: "./tree/tree.module#TreeModule" },
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "todos" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
