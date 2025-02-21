import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
//import { Observable } from 'rxjs';
import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';

const COMMON_IMPORTS: unknown[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterModule.forRoot([]),
];

describe('Todo list', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS, TodoListComponent],

      providers: [{ provide: TodoService, useValue: new MockTodoService() }],
    });
  });

beforeEach(waitForAsync(() => {

    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;

      fixture.detectChanges();
    });
  }));

  it('contains all the owners', () => {
    expect(todoList.serverFilteredTodos().length).toBe(3);
  });

  it("contains a todo owner named 'Blanche'", () => {
    expect(
      todoList.serverFilteredTodos().some((todo: Todo) => todo.owner === 'Blanche')
    ).toBe(true);
  });

  it("contain a todo owner named 'Fry'", () => {
    expect(
      todoList.serverFilteredTodos().some((todo: Todo) => todo.owner === 'Fry')
    ).toBe(true);
  });

  it("doesn't contain a todo owner named 'Santa'", () => {
    expect(
      todoList.serverFilteredTodos().some((todo: Todo) => todo.owner === 'Santa')
    ).toBe(false);
  });

  it("doesn't contain a todo owner named 'Money'", () => {
    expect(
      todoList.serverFilteredTodos().some((todo: Todo) => todo.owner === 'Money')
    ).toBe(false);
  });

//  describe('Misbehaving Todo List', () => {
//    let todoList: TodoListComponent;
//    let fixture: ComponentFixture<TodoListComponent>;

//    let todoServiceStub: {
//      getTodos: () => Observable<Todo[]>;
//      filterTodos: () => Todo[];
//    } n ;

//    beforeEach(() => {
//      todoServiceStub = {
//        getTodos: () =>
//          new Observable((observer) => {
//            observer.error('getTodos() Observer generates an error');
//          }),
//        filterTodos: () => []
//      };

//      TestBed.configureTestingModule({
//        imports: [COMMON_IMPORTS, TodoListComponent],

//        providers: [{ provide: TodoService, useValue: todoServiceStub }],
//      });
//    });


//    beforeEach(waitForAsync(() => {
//      TestBed.compileComponents().then(() => {
//        fixture = TestBed.createComponent(TodoListComponent);
//        todoList = fixture.componentInstance;
//        fixture.detectChanges();
//      });
//    }));

//    it("generates an error if we don't set up a TodoListService", () => {

//     expect(todoList.serverFilteredTodos())
//       .withContext("service can't give values to the list if it's not there")
//       .toEqual([]);

//     expect(todoList.errMsg())
//       .withContext('the error message will be')
//       .toContain('Problem contacting the server – Error Code:');
//   });
//  });
 });


