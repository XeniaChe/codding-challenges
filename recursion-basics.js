var fib = function (n, memo = {}) {
  if (memo[n]) return memo[n];

  if (n < 2) return n;

  memo[n] = fib(n - 2, memo) + fib(n - 1, memo);

  return memo[n];
};

// console.log(fib(3));
// console.log(fib(4));
// console.log(fib(5));

/////// CLIMBING STAIRS
/* You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 */

/* var climbStairs = function (n, memo = {}) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (memo[n]) return memo[n];

  if (n === 0 || n === 1) {
    return 1;
  }

  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);

  return memo[n];
}; */

///////////////////////////////////////////TAIL RECURSION
var climbStairs2 = function (n, res, k) {
  k ??= 1;
  res ??= {};

  if (k === 1) {
    res[k] = 1;
  } else if (k === 2) {
    res[k] = 2;
  } else {
    res[k] = res[k - 2] + res[k - 1];
  }

  if (k === n) return res[k];

  return climbStairs2(n, res, ++k);
};

////// Unexpectedly slower and highier space complexity than above
/* var climbStairs2 = function (n) {
  let res = {
    1: 1,
    2: 2,
  };
  let k = 2;

  while (k < n) {
    k++;
    res[k] = res[k - 1] + res[k - 2];
  }

  return res[n];
};
 */

// console.log(climbStairs(7));
// console.log(climbStairs2(7));

/////// POWER OF
// Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

// No recursion big time complexity
/* var myPow = function (x, n) {
  let res = x;
  while (n > 1) {
    res *= x;
    n--;
  }

  return res;
}; */

///////////////////////////////////////////////// TAIL RECURSION
// This works but NOT for really huge n values
// gets stack overflow error even with TAIL RECURSION
var myPow = function (x, n, res) {
  let local = n > 0 ? x : 1 / x;
  res ??= local;

  if (n === 0) return 0;
  if (n === 1 || n === -1) return res;

  return n > 0 ? myPow(x, n - 1, res * x) : myPow(x, n + 1, res * (1 / x));
};

/// This solved the above problem
var myPow = function (x, n, res) {
  let initRes = n > 0 ? x : 1 / x;
  res ??= initRes;

  if (n === 0) return 1;
  if (n === 1 || n === -1) return res;

  if (n % 2 === 0) {
    let localRes = myPow(x, n / 2, res);
    return localRes * localRes;
  } else if (n % 2 === 1) {
    return myPow(x, n - 1, res) * x;
  } else {
    return myPow(x, n + 1, res) * (1 / x);
  }
};

// console.log(myPow(34.00515, -3));
// console.log(myPow(2, 3));

/* 
We build a table of n rows (1-indexed). We start by writing 0 in the 1st row. Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10.

For example, for n = 3, the 1st row is 0, the 2nd row is 01, and the 3rd row is 0110.
Given two integer n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.
  */

/* Simillar to Pascal's triangle solution. Generally you build a whole array
all the way down to the (n,k). To heavy calculation
Working bit only to the point where k is very hight
 */
/* var kthGrammar = function (n, k) {
  if ((n === 1 || n === 2) && k === 1) return 0;
  if (n === 2 && k === 2) return 1;

  let prevArr = [0, 1];
  for (let i = 3; i <= n; i++) {
    const prevLemgth = prevArr.length;

    for (let j = prevLemgth / 2; j < prevLemgth; j++) {
      let local = prevArr[j] === 0 ? [0, 1] : [1, 0];
      prevArr.push(...local);
    }
  }

  return prevArr[k - 1];
}; */

var kthGrammar = function (n, k) {
  let resNum, localPair, localNum;

  if (k === 1) return 0;
  if (k === 2) return 1;

  let prevK = k % 2 ? (k + 1) / 2 : k / 2;
  localNum = kthGrammar(n, prevK);

  localPair = localNum === 0 ? [0, 1] : [1, 0];
  resNum = k % 2 ? localPair[0] : localPair[1];

  return resNum;
};
// console.log(kthGrammar(30, 434991989));
// console.log(kthGrammar(4, 6));

const dfsTest = (grid, row, col, sum) => {
  let m = grid.length,
    n = grid[0].length;

  let rowCheck = row < m && row >= 0;
  let colCheck = col < n && col >= 0;

  if (!rowCheck || !colCheck || !grid[row][col]) return /* sum */;

  if (grid[row][col]) {
    sum.val++;
    grid[row][col] = 0;

    /* sum =  */ dfsTest(grid, row + 1, col, sum);
    /* sum =  */ dfsTest(grid, row - 1, col, sum);
    /* sum =  */ dfsTest(grid, row, col + 1, sum);
    /* sum =  */ dfsTest(grid, row, col - 1, sum);
  }

  // return sum;
};
// Avoiding the need to return 'sum' from every recursive call
// By making 'sum' a variable of reference type = object
const test = (grid) => {
  /*let  sum =  0  */
  let sum = { val: 0 },
    m = grid.length,
    n = grid[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j]) {
        /* sum +=  */ dfsTest(grid, i, j, sum);
      }
    }
  }

  return sum.val;
};
let testGr = [
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// console.log(test(testGr));
