const { maxSubArray, coinChange, canJump } = require('../dynamic-programing');

describe('maxSubArray Problem', () => {
  test('first', () => {
    const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    let res = maxSubArray(nums);
    expect(res).toBe(6);
  });
  test('second', () => {
    const nums = [5, 4, -1, 7, 8];
    let res = maxSubArray(nums);
    expect(res).toBe(23);
  });
  test('third', () => {
    const nums = [1, 1, -2];
    let res = maxSubArray(nums);
    expect(res).toBe(2);
  });
  test('fourth', () => {
    const nums = [-1, 0, -2];
    let res = maxSubArray(nums);
    expect(res).toBe(0);
  });
  test('fifth', () => {
    const nums = [-2, 1];
    let res = maxSubArray(nums);
    expect(res).toBe(1);
  });
  test('sixth', () => {
    const nums = [-2, -3, -1];
    let res = maxSubArray(nums);
    expect(res).toBe(-1);
  });
  test('seventh', () => {
    const nums = [-2, -1];
    let res = maxSubArray(nums);
    expect(res).toBe(-1);
  });
});

describe('coinChange Problem', () => {
  it('first', () => {
    const coins = [1, 2, 5];
    const amount = 11;
    expect(coinChange(coins, amount)).toBe(3);
  });
  it('second', () => {
    const coins = [2, 5, 10, 1];
    const amount = 27;
    expect(coinChange(coins, amount)).toBe(4);
  });
  it('first', () => {
    const coins = [186, 419, 83, 408];
    const amount = 6249;
    expect(coinChange(coins, amount)).toBe(20);
  });
});

describe('canJump Problem', () => {
  it('first', () => {
    const nums = [2, 3, 1, 1, 4];

    expect(canJump(nums)).toBe(true);
  });

  it('second', () => {
    const nums = [3, 2, 1, 0, 4];

    expect(canJump(nums)).toBe(false);
  });
  it('second', () => {
    const nums = [0, 1];

    expect(canJump(nums)).toBe(false);
  });
});
