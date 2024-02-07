// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 6, action: Action.Add, expected: 11 },
  { a: 6, b: 6, action: Action.Add, expected: 12 },
  { a: 16, b: 4, action: Action.Add, expected: 20 },

  { a: 6, b: 5, action: Action.Subtract, expected: 1 },
  { a: 8, b: 2, action: Action.Subtract, expected: 6 },
  { a: 18, b: 2, action: Action.Subtract, expected: 16 },

  { a: 6, b: 5, action: Action.Multiply, expected: 30 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 18, b: 2, action: Action.Multiply, expected: 36 },

  { a: 30, b: 5, action: Action.Divide, expected: 6 },
  { a: 16, b: 2, action: Action.Divide, expected: 8 },
  { a: 16, b: 0, action: Action.Divide, expected: Infinity },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },

  { a: 5, b: 6, action: 'unknownAction', expected: null },
  { a: 2, b: 3, action: undefined, expected: null },

  { a: '5', b: 6, action: undefined, expected: null },
  { a: 5, b: '6', action: undefined, expected: null },
  { a: '5', b: '6', action: undefined, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator({ a: $a, b: $b, action: $action })',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
