import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Todo } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';


@Injectable({
  providedIn: AppComponent
})
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: '58af3a600343927e48e8720f',
      owner: 'Blanche',
      status: false,
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design',
    },
    {
      _id: '58af3a600343927e48e8721d',
      owner: 'Dawn',
      status: true,
      body: 'Magna exercitation pariatur in labore. Voluptate adipisicing reprehenderit dolor veniam dolore amet duis anim nisi.',
      category: 'homework',
    },
    {
      _id: '58af3a600343927e48e87223',
      owner: 'Fry',
      status: false,
      body: 'Aliquip dolor cupidatat incididunt mollit commodo aliqua aute amet reprehenderit incididunt excepteur ipsum reprehenderit. Consectetur est velit aute proident occaecat exercitation exercitation.',
      category: 'video games',
    }
  ];

  constructor() {
    super(null);
  }

// skipcq: JS-0105
  // It's OK that the `_filters` argument isn't used here, so we'll disable
  // this warning for just his function.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTodos(_filters: { owner?: string; category?: string; body?: string; status?: boolean }): Observable<Todo[]> {

    return of(MockTodoService.testTodos);
  }


}
