const Calculator = require('../src/calculator');

describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  test('adds two numbers', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('subtracts two numbers', () => {
    expect(calc.subtract(5, 3)).toBe(2);
  });

  test('multiplies two numbers', () => {
    expect(calc.multiply(4, 3)).toBe(12);
  });

  test('divides two numbers', () => {
    expect(calc.divide(12, 4)).toBe(3);
  });

  test('throws error on division by zero', () => {
    expect(() => calc.divide(10, 0)).toThrow('Division by zero');
  });
});
