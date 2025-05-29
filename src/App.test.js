import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Todo App', () => {
  test('renders todo app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Todo App with CI\/CD/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<App />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    expect(input.value).toBe('Test Todo');

    fireEvent.click(addButton);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<App />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText('Test Todo');
    fireEvent.click(todoItem);

    expect(todoItem.closest('li')).toHaveClass('completed');
  });

  test('deletes a todo', () => {
    render(<App />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    /**
| Method          | Behavior if element **is not found**                      | Typical usage                                |
| --------------- | --------------------------------------------------------- | -------------------------------------------- |
| `getByText()`   | **Throws an error** if the element is not found           | When you **expect the element to exist**     |
| `queryByText()` | **Returns `null`** if the element is not found (no error) | When you **expect the element NOT to exist** |


You are asserting that the todo text should no longer be in the DOM after deletion.

If you used getByText('Test Todo') here and the element was correctly deleted, getByText would throw an error, causing the test to fail even though the deletion worked fine.

queryByText safely returns null when the element is missing, so .not.toBeInTheDocument() passes as expected.


Use getByText when the element should be present (exists).
Use queryByText when the element should NOT be present (does not exist).
     */
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });
});