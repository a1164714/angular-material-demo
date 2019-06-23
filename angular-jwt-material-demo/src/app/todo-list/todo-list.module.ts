import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { TodoEditComponent } from "./todo-edit/todo-edit.component";
import { TodoListComponent } from "./todo-list.component";


const routes: Routes = [
  {
    path: "", 
    component: TodoListComponent, 
    data: {
      title: 'todos'
    },
  }
];

@NgModule({
  declarations: [
    TodoListComponent,
    TodoEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [TodoEditComponent]
})
export class TodoListModule { }
