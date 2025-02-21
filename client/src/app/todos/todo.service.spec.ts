import { HttpClient, HttpParams, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  // A small collection of test todos
  const testTodos: Todo[] = [
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
  let todoService: TodoService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    // Construct an instance of the service with the mock
    // HTTP client.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('When getTodos() is called with no parameters', () => {

     it('calls `api/todos`', waitForAsync(() => {

       const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

       todoService.getTodos().subscribe(() => {

         expect(mockedMethod)
           .withContext('one call')
           .toHaveBeenCalledTimes(1);

         expect(mockedMethod)
           .withContext('talks to the correct endpoint')
           .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams() });
       });
     }));
   });

   describe('When getTodos() is called with parameters, it correctly forms the HTTP request (Javalin/Server filtering)', () => {

    it('correctly calls api/todos with filter parameter \'video games\'', () => {
        const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));
        todoService.getTodos({ category: 'video games' }).subscribe(() => {
          expect(mockedMethod)
            .withContext('one call')
            .toHaveBeenCalledTimes(1);

          expect(mockedMethod)
            .withContext('talks to the correct endpoint')
            .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams().set('category', 'video games') });
        });
    });


    it('filters by body', () => {
      const todoBody = 'quis';
      const filteredTodos = todoService.filterTodos(testTodos, { body: todoBody });

      expect(filteredTodos.length).toBe(1);

      filteredTodos.forEach(todo => {
        expect(todo.body.indexOf(todoBody)).toBeGreaterThanOrEqual(0);
      });
    });


    it('correctly calls api/todos with filter parameter \'owner\'', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

      todoService.getTodos({ owner:'Blanche' }).subscribe(() => {
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(todoService.todoUrl, { params: new HttpParams().set('owner', 'Blanche') });
      });
    });

    it('correctly calls api/users with multiple filter parameters', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testTodos));

      todoService.getTodos({ owner: 'Blanche', category: 'software design' }).subscribe(() => {


        const [url, options] = mockedMethod.calls.argsFor(0);

        const calledHttpParams: HttpParams = (options.params) as HttpParams;
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(url)
          .withContext('talks to the correct endpoint')
          .toEqual(todoService.todoUrl);
        expect(calledHttpParams.keys().length)
          .withContext('should have 2 params')
          .toEqual(2);
        expect(calledHttpParams.get('owner'))
          .withContext('owner being Blanche')
          .toEqual('Blanche');
        expect(calledHttpParams.get('category'))
          .withContext('category being software design')
          .toEqual('software design');
      });
  });
});

describe('When getTodoById() is given an ID', () => {

    it('calls api/todos/id with the correct ID', waitForAsync(() => {

      const targetTodo: Todo = testTodos[1];
      const targetId: string = targetTodo._id;


      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(targetTodo));


      todoService.getTodoById(targetId).subscribe(() => {

        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
      });
    }));
  });

    describe('Filtering on the client using `filterTodos()` (Angular/Client filtering)', () => {

      it('filters by owner', () => {
        const todoOwner = 'Fry';
        const filteredTodos = todoService.filterTodos(testTodos, { owner: todoOwner });

        expect(filteredTodos.length).toBe(1);

        filteredTodos.forEach(todo => {
          expect(todo.owner.indexOf(todoOwner)).toBeGreaterThanOrEqual(0);
        });
      });

      it('filters by body', () => {
        const todoBody = 'quis';
        const filteredTodos = todoService.filterTodos(testTodos, { body: todoBody });

        expect(filteredTodos.length).toBe(1);

        filteredTodos.forEach(todo => {
          expect(todo.body.indexOf(todoBody)).toBeGreaterThanOrEqual(0);
        });
      });

      it('filters by category', () => {
        const todoCategory = 'video games';
        const filteredTodos = todoService.filterTodos(testTodos, { category: todoCategory });

        expect(filteredTodos.length).toBe(1);

        filteredTodos.forEach(todo => {
          expect(todo.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
        });
      });

    });
  });
