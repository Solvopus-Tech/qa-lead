import { it, expect } from 'vitest';
import { add, subtract } from '../src/math';

it('add function works', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});

it('subtract function works', () => {
  expect(subtract(5, 3)).toBe(2);
  expect(subtract(10, 5)).toBe(5);
});