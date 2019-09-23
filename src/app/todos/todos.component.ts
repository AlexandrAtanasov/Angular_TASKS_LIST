import { Component, OnInit } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  private loading: boolean = true
  private searchString: string = ''

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.fetchTodos()
      .pipe(delay(500))  
      .subscribe( () => {
      this.loading = false
    })
  }

  onChange(id: number) {
    // this.onToggle.emit(id)
    this.todosService.onToggle(id)
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id)
  }

}
