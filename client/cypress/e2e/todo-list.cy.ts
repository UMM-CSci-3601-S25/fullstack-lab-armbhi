import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todo list', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should show 300 todos in list view', () => {
    //page.getTodoCards().should('have.length', 10);
    page.getVisibleTodos().should('have.length', 300);

  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for todo 'Fry'


    page.filterByOwner('Fry')

    page.getVisibleTodos().should('have.lengthOf',61)

     // Go through each of the visible todos that are being shown and get the owner

     page.getTodoOwners()
   //We should see these todos who owner contains Fry
   .should('contain.text', 'Fry')
      // We shouldn't see these todos
      .should('not.contain.text', 'Blanche')
      .should('not.contain.text', 'Barry')
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for todo 'Fry'


    page.filterByCategory('homework')

    page.getVisibleTodos().should('have.lengthOf',79)

     // Go through each of the visible todos that are being shown and get the category

     page.getTodoCategories()

   .should('contain.text', 'homework')
      // We shouldn't see these todos
      .should('not.contain.text', 'groceries')
      .should('not.contain.text', 'software design')
  });



  it('Should type something in the body filter and check that it returned correct elements', () => {
    // Filter for todo 'Fry'


    page.filterByBody('quis')

    page.getVisibleTodos().should('have.lengthOf',89)

     // Go through each of the visible todos that are being shown and get the body

     page.getTodoBodies()
   //We should see these todos who owner contains Fry
   .should('contain.text', 'quis')


  });



  // it('Should type complete in the status filter and check that it returned true correct elements', () => {
  //   // Filter for todo 'Fry'


  //   page.filterByStatus(true)

  //   page.getVisibleTodos().should('have.lengthOf',1)

  //    // Go through each of the visible todos that are being shown and get the owner

  //    page.getTodoStatuses()
  //  //We should see these todos who owner contains Fry
  //  .should('contain.text', true)
  //     // We shouldn't see these todos
  //     .should('not.contain.text', false)
  // });

  // it('Should type incomplete in the status filter and check that it returned false correct elements', () => {
  //   // Filter for todo 'Fry'


  //   page.filterByStatus(false)

  //   page.getVisibleTodos().should('have.lengthOf',1)

  //    // Go through each of the visible todos that are being shown and get the owner

  //    page.getTodoStatuses()
  //  //We should see these todos who owner contains Fry
  //  .should('contain.text', false)
  //     // We shouldn't see these todos
  //     .should('not.contain.text', true)

  // });
  });


