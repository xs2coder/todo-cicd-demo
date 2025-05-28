describe('Todo App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the app title', () => {
    cy.contains('Todo App with CI/CD').should('be.visible');
  });

  it('should add a new todo', () => {
    cy.get('[data-testid="todo-input"]').type('My first todo');
    cy.get('[data-testid="add-button"]').click();
    cy.contains('My first todo').should('be.visible');
  });

  it('should toggle todo completion', () => {
    cy.get('[data-testid="todo-input"]').type('Todo to complete');
    cy.get('[data-testid="add-button"]').click();
    
    cy.contains('Todo to complete').click();
    cy.contains('Todo to complete').parent().should('have.class', 'completed');
  });

  it('should delete a todo', () => {
    cy.get('[data-testid="todo-input"]').type('Todo to delete');
    cy.get('[data-testid="add-button"]').click();
    
    cy.contains('Delete').click();
    cy.contains('Todo to delete').should('not.exist');
  });

  it('should add multiple todos', () => {
    const todos = ['First todo', 'Second todo', 'Third todo'];
    
    todos.forEach(todo => {
      cy.get('[data-testid="todo-input"]').type(todo);
      cy.get('[data-testid="add-button"]').click();
    });
    
    todos.forEach(todo => {
      cy.contains(todo).should('be.visible');
    });
  });
});