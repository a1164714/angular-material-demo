import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from "./todo";
import { Page } from '../shared/dto/page';
import { CommonResponse } from '../shared/dto/common-response';

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private http: HttpClient) { }

  list(pageNum: string, pageSize: string) {
    return this.http.get<CommonResponse<Page<Todo>>>("/api/todos", { params: { "pageSize": pageSize, "pageNum": pageNum } });
  }

  get(id: number) {
    return this.http.get<Todo>(`/api/todos/${id}`);
  }

  update(todo: Todo) {
    return this.http.post("/api/todos", todo);
  }

  delete(id: number) {
    return this.http.delete(`/api/todos/${id}`);
  }
}
