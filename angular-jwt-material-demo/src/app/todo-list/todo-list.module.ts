import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { TodoEditComponent } from "./todo-edit/todo-edit.component";
import { TodoListComponent } from "./todo-list.component";
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlCustom } from '../shared/custom/mat-pageinator-intl-custom';


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
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCustom
    }],
  entryComponents: [TodoEditComponent]
})
export class TodoListModule { }
