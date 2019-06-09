import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from "./todo";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Todo[]>("/api/todos");
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
