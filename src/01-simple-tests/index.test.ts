// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: Action.Add })).toBe(11);
    expect(simpleCalculator({ a: 6, b: 6, action: Action.Add })).toBe(12);
    expect(simpleCalculator({ a: 16, b: 4, action: Action.Add })).toBe(20);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 5, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Subtract })).toBe(6);
    expect(simpleCalculator({ a: 18, b: 2, action: Action.Subtract })).toBe(16);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 5, action: Action.Multiply })).toBe(30);
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Multiply })).toBe(16);
    expect(simpleCalculator({ a: 18, b: 2, action: Action.Multiply })).toBe(36);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 30, b: 5, action: Action.Divide })).toBe(6);
    expect(simpleCalculator({ a: 16, b: 2, action: Action.Divide })).toBe(8);
    expect(simpleCalculator({ a: 16, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(
      27,
    );
    expect(simpleCalculator({ a: 3, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: 'unknownAction' })).toBe(
      null,
    );
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: undefined,
      }),
    ).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '5', b: 6, action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: 5, b: '6', action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: '5', b: '6', action: Action.Add })).toBe(null);
  });
});
