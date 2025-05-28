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

    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });
});