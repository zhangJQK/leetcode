import { it, expect } from '../../libs/test/index.js';
import { clumsy } from '../../problems/1006/index.js';
it('1006', () => {
  expect(clumsy).call(4).toBe(7);
  expect(clumsy).call(10).toBe(12);
});
