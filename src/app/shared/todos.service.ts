import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


export interface Todo {
    id: number
    title: string
    completed: boolean
    date?: any
}

@Injectable({providedIn: "root"})
export class TodosService {

    public todos: Todo[] = [
        {id: 1, title: "Разобраться, как работать с Angular", completed: false, date: new Date()},
        {id: 2, title: "Выполнить тестовое задание", completed: false, date: new Date()},
        {id: 3, title: "Получить работу", completed: false, date: new Date()},
    ]

    constructor (private http: HttpClient) {

    }

    fetchTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .pipe(tap(todos => this.todos = todos))
    }

    onToggle(id: number) {
        const IDX = this.todos.findIndex( t => t.id === id)
        this.todos[IDX].completed = !this.todos[IDX].completed 
      }

    removeTodo(id: number) {
        this.todos = this.todos.filter(t => t.id != id)
    }

    addTodo(todo: Todo) {
        this.todos.push(todo)
    }
}