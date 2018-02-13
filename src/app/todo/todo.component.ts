import {Component, OnInit} from '@angular/core';
import {Todo} from '../model/todo';
import {TodoService} from '../shared/todoService/todoService.service';
import {Observable} from "RxJS/Rx";

@Component({
  selector: 'todo-app',
  templateUrl: 'todo.component.html',
  // styleUrls:['todo.component.css'],
  // providers: [TodoService]
})
export class TodoComponent implements OnInit{

  newTodo: Todo[]= [];
  todos: Todo[] = [];
  todoList: Observable<Todo[]> = null;
  errorMessage: string = '';

  constructor(private todoService: TodoService) {

  }
    ngOnInit(){
     // called after the constructor and called  after the first ngOnChanges()
     this.getTodos();
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    let todo = new Todo(19, 1, 'testTitle', false);
    this.todoService.addTodo(todo)
      .subscribe(error => (this.errorMessage = <any>error));
  }

  delete(id: number | string){
    this.todoService.deleteTodoById(id).subscribe(error => (this.errorMessage = <any>error));
  }

  update(title: string): void {
      title = title.trim();
    if (!title) { return; }
    let todo = new Todo(19, 1, 'testTitle', false);

    this.todoService.updateTodo(todo)
      .subscribe(error => (this.errorMessage = <any>error));
  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }
  // ok
  getTodoById(id: number | string){
    this.todoService.loadTodo(id)
          .subscribe(
            todo => {this.newTodo = todo},
            error => (this.errorMessage = <any>error)
            );
  }
  // ok
  getTodos() {
     this.todoService.getTodos()
                         .subscribe(
                       todos => {this.todos = todos},
                       error =>  {this.errorMessage = <any>error});

   // this.todoList = this.todoService.getTodos(); // shorter version though without error logging option. subscribes & unsubscribe automatically. Use it along with async pipe in the html template

}


}