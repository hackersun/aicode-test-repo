const { describe, it } = require('node:test');
const assert = require('node:assert');
const utils = require('../src/utils');

describe('average', () => {
  it('should calculate average of numbers', () => {
    assert.strictEqual(utils.average([1, 2, 3, 4, 5]), 3);
    assert.strictEqual(utils.average([10, 20, 30]), 20);
  });

  it('should handle single number', () => {
    assert.strictEqual(utils.average([42]), 42);
  });

  it('should handle decimal results', () => {
    assert.strictEqual(utils.average([1, 2]), 1.5);
  });

  it('should throw error for empty array', () => {
    assert.throws(() => utils.average([]), /Input must be a non-empty array/);
  });

  it('should throw error for non-array', () => {
    assert.throws(() => utils.average(null), /Input must be a non-empty array/);
    assert.throws(() => utils.average('string'), /Input must be a non-empty array/);
  });
});

describe('isValidEmail', () => {
  it('should validate correct emails', () => {
    assert.strictEqual(utils.isValidEmail('test@example.com'), true);
    assert.strictEqual(utils.isValidEmail('user.name@domain.co.uk'), true);
    assert.strictEqual(utils.isValidEmail('user+tag@example.org'), true);
  });

  it('should reject invalid emails', () => {
    assert.strictEqual(utils.isValidEmail('invalid-email'), false);
    assert.strictEqual(utils.isValidEmail('@example.com'), false);
    assert.strictEqual(utils.isValidEmail('user@'), false);
    assert.strictEqual(utils.isValidEmail(''), false);
  });

  it('should handle non-string inputs', () => {
    assert.strictEqual(utils.isValidEmail(null), false);
    assert.strictEqual(utils.isValidEmail(123), false);
    assert.strictEqual(utils.isValidEmail({}), false);
  });
});

describe('toQueryString', () => {
  it('should convert object to query string', () => {
    const result = utils.toQueryString({ a: 1, b: 2 });
    assert.ok(result === 'a=1&b=2' || result === 'b=2&a=1');
  });

  it('should encode special characters', () => {
    const result = utils.toQueryString({ name: 'John Doe' });
    assert.strictEqual(result, 'name=John%20Doe');
  });

  it('should filter null and undefined values', () => {
    const result = utils.toQueryString({ a: 1, b: null, c: undefined, d: 2 });
    assert.ok(!result.includes('b='));
    assert.ok(!result.includes('c='));
    assert.ok(result.includes('a=1'));
    assert.ok(result.includes('d=2'));
  });

  it('should handle empty object', () => {
    assert.strictEqual(utils.toQueryString({}), '');
  });

  it('should handle non-object inputs', () => {
    assert.strictEqual(utils.toQueryString(null), '');
    assert.strictEqual(utils.toQueryString('string'), '');
  });
});

describe('debounce', () => {
  it('should delay function execution', async () => {
    let called = 0;
    const fn = () => { called++; };
    const debounced = utils.debounce(fn, 50);
    
    debounced();
    debounced();
    debounced();
    
    assert.strictEqual(called, 0);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    assert.strictEqual(called, 1);
  });

  it('should pass arguments to debounced function', async () => {
    let result;
    const fn = (a, b) => { result = a + b; };
    const debounced = utils.debounce(fn, 10);
    
    debounced(2, 3);
    await new Promise(resolve => setTimeout(resolve, 50));
    assert.strictEqual(result, 5);
  });
});
