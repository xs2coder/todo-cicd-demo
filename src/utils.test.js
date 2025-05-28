import { formatDate, validateTodo } from './utils';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });
  });

  describe('validateTodo', () => {
    test('returns true for valid todo text', () => {
      expect(validateTodo('Valid todo')).toBe(true);
    });

    test('returns false for empty string', () => {
      expect(validateTodo('')).toBe(false);
    });

    test('returns false for whitespace only', () => {
      expect(validateTodo('   ')).toBe(false);
    });

    test('returns false for null/undefined', () => {
      expect(validateTodo(null)).toBe(false);
      expect(validateTodo(undefined)).toBe(false);
    });
  });
});