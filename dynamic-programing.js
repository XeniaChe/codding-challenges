/* 746. Min Cost Climbing Stairs
  Easy
  8.6K
  1.3K
  Companies
  You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

  You can either start from the step with index 0, or the step with index 1.

  Return the minimum cost to reach the top of the floor.

  */

const { count } = require('console');

// BACK to FRONT solution === Top Bottom
var dpClimbStairs = (ind, arr, memo = {}) => {
  if (memo[ind]) return memo[ind];

  if (ind <= 1) return 0;

  memo[ind] = Math.min(
    dpClimbStairs(ind - 1, arr, memo) + arr[ind - 1],
    dpClimbStairs(ind - 2, arr, memo) + arr[ind - 2]
  );

  return memo[ind];
};

var minCostClimbingStairs = function (cost) {
  return dpClimbStairs(cost.length, cost);
};

// Front Back === Bottom Top
// TAIL Recursion
var minCostClimbingStairs = function (cost, obj = {}, n) {
  n ??= 0;
  if (n == 0) {
    obj[n] = cost[0];
  } else if (n == 1) {
    obj[n] = cost[1];
  } else {
    obj[n] = Math.min(obj[n - 1], obj[n - 2]) + cost[n];
  }

  if (n == cost.length - 1) return Math.min(obj[n], obj[n - 1]);

  return minCostClimbingStairs(cost, obj, ++n);
};

// Front Back === Bottom Top
// Itterative solution
var minCostClimbingStairs = function (cost, obj = {}, n) {
  let ans = new Array(cost.length + 1).fill(0);

  ans[0] = cost[0];
  ans[1] = Math.min(cost[0], cost[1]);

  for (let i = 2; i <= cost.length; i++) {
    ans[i] = Math.min(ans[i - 1], ans[i - 2]) + cost[i];
  }

  return ans[ans.length];
};

let cost = [10, 15, 20, 3];
// cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
// console.log(minCostClimbingStairs(cost));

/* 
  198. House Robber
  Medium
  16.5K
  324
  Companies
  You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

  Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
 */

// BACK to FRONT solution === Top Bottom
var dpRob = (ind, nums, memo) => {
  if (ind === 0) return nums[0];
  if (ind === 1) return Math.max(nums[0], nums[1]);

  if (memo[ind] !== -1) return memo[ind];

  // Recurrence relation
  memo[ind] = Math.max(
    dpRob(ind - 2, nums, memo) + nums[ind],
    dpRob(ind - 1, nums, memo)
  );

  return memo[ind];
};

var rob = function (nums) {
  if (nums.length == 1) return nums[0];

  let memo = new Array(nums.length).fill(-1);

  return dpRob(nums.length - 1, nums, memo);
};

// Front Back === Bottom Top
// TAIL Recursion
var rob = function (nums, obj = {}, k) {
  if (nums.length === 1) return nums[0];

  k ??= 0;

  if (k == 0) {
    obj[k] = nums[0];
  } else if (k == 1) {
    obj[k] = Math.max(nums[1], nums[0]);
  } else {
    obj[k] = Math.max(obj[k - 2] + nums[k], obj[k - 1]);
  }

  if (k === nums.length - 1) return obj[k];

  return rob(nums, obj, ++k);
};
// Bottom Top
// Itterative
var rob = function (nums) {
  if (nums.length == 1) {
    return nums[0];
  }
  let ans = new Array(nums.length).fill(0);

  ans[0] = nums[0];
  ans[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < ans.length; i++) {
    ans[i] = Math.max(ans[i - 2] + nums[i], ans[i - 1]);
  }

  return ans[ans.length - 1];
};

let nums = [1, 2, 3, 1];
nums = [2, 1, 1, 2];
// console.log(rob(nums));

let nums2 = [1, 2, 3, 1];
nums2 = [2, 1, 1, 2, 3, 8, 1];
nums2 = [1, 2, 3, 1];
console.log(rob(nums2));

/* 
  Longest Increasing Subsequence
  Medium
  16K
  294
  Companies
  Given an integer array nums, return the length of the longest strictly increasing 
  subsequence


*/

// Top Bottom
// Recursive
let dp = (i, memo) => {
  if (memo[i] != -1) {
    return memo[i];
  }

  let ans = 1; // Base case
  for (let j = 0; j < i; j++) {
    if (nums[i] > nums[j]) {
      ans = Math.max(ans, dp(j) + 1);
    }
  }

  memo[i] = ans;
  return memo[i];
};

var lengthOfLIS = function (nums) {
  let memo = new Array(nums.length).fill(-1);
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    ans = Math.max(ans, dp(i, memo));
  }

  return ans;
};

// Bottom Top
// Itterative

var lengthOfLIS = function (nums) {
  let dp = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
};
nums = [1, 2, 5, 3, 4];
// console.log(lengthOfLIS(nums));

/* Solving Questions With Brainpower
  Medium

  You are given a 0-indexed 2D integer array questions where questions[i] = [pointsi, brainpoweri].

  The array describes the questions of an exam, where you have to process the questions in order (i.e., starting from question 0) and make a decision whether to solve or skip each question. Solving question i will earn you pointsi points but you will be unable to solve each of the next brainpoweri questions. If you skip question i, you get to make the decision on the next question.

  For example, given questions = [[3, 2], [4, 3], [4, 4], [2, 5]]:
  If question 0 is solved, you will earn 3 points but you will be unable to solve questions 1 and 2.
  If instead, question 0 is skipped and question 1 is solved, you will earn 4 points but you will be unable to solve questions 2 and 3.
  Return the maximum points you can earn for the exam.
 */

const dpMostPoints2 = (questions, ind, memo) => {
  if (memo[ind] && memo[ind] !== -1) return memo[ind];

  if (ind >= questions.length) return 0;

  let nextQ = ind + questions[ind][1] + 1;
  memo[ind] = Math.max(
    questions[ind][0] + dpMostPoints2(questions, nextQ, memo),
    dpMostPoints2(questions, ind + 1, memo)
  );

  return memo[ind];
};

var mostPoints = function (questions) {
  let memo = new Array(questions.length).fill(-1);

  dpMostPoints2(questions, 0, memo);
  return Math.max(...memo);
};

// TODO: fix itterative solution
/* var mostPoints = function (questions) {
  let ans = new Array(questions.length).fill(0);

  for (let i = 0; i < questions.length - 1; i++) {
    let nextQ = i + questions[i][1] + 1;

    ans[i] = Math.max(
      questions[nextQ]
        ? ans[i] || questions[i][0] + questions[nextQ][0]
        : ans[i] || questions[i][0],
      ans[i]
    );

    if (ans[nextQ] >= 0) ans[nextQ] = Math.max(ans[nextQ], ans[i]);
  }

  return Math.max(...ans);
};
 */
let questions = [
  [3, 2],
  [4, 3],
  [4, 4],
  [2, 5],
];
questions = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
];
questions = [
  [21, 5],
  [92, 3],
  [74, 2],
  [39, 4],
  [58, 2],
  [5, 5],
  [49, 4],
  [65, 3],
];
// console.log(mostPoints(questions));

/* You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 */

// Top - Bottom
// Recursive sol-n
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

// Bottom - Top
// Itterative sol-n
var climbStairs = function (n) {
  let ans = new Array(n).fill(0);
  ans[0] = 1;
  ans[1] = 2;

  if (n == 1 || n == 2) return ans[n - 1];

  for (let i = 2; i < ans.length; i++) {
    ans[i] = ans[i - 1] + ans[i - 2];
  }
  return ans[ans.length - 1];
};

/* Coin Change

Solution
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

 */

// Top Down
// recursive
var recursiveCoinChange = (coins, amount, memo) => {
  let minCount = +Infinity,
    count = 0;

  if (memo[amount]) return memo[amount];

  if (amount < 0) return -1;
  if (amount == 0) return 0;

  for (let i = coins.length - 1; i >= 0; i--) {
    count = 1 + recursiveCoinChange(coins, amount - coins[i], memo);

    if (count !== 0) minCount = Math.min(minCount, count);
    memo[amount] = minCount === +Infinity ? -1 : minCount;
  }

  return memo[amount];
};

var coinChange = (coins, amount) => {
  return recursiveCoinChange(coins, amount, {});
};

/* var recursiveCoinChange = (coins, amount) => {
  let minCount = +Infinity,
    count = 0;

  if (amount < 0) return -1;
  if (amount == 0) return 0;

  for (let i = coins.length - 1; i >= 0; i--) {
    count = 1 + recursiveCoinChange(coins, amount - coins[i]);

    if (count !== 0) minCount = Math.min(minCount, count);
  }

  return minCount === +Infinity ? -1 : minCount;
};

var coinChange = (coins, amount) => {
  return recursiveCoinChange(coins, amount, {});
}; */

let coins = [1, 2, 5],
  amount = 11;
// (coins = [2]), (amount = 3);

// (coins = [186, 419, 83, 408]), (amount = 6249);
// console.log(coinChange(coins, amount));

/* Best Time to Buy and Sell Stock
  Easy
  Solution
  You are given an array prices where prices[i] is the price of a given stock on the ith day.

  You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

  Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0. */

// Do not undertand how it's a DP problem !!!!!!!!

var maxProfit = function (prices) {
  let maxProfit = 0,
    minPrice = prices[0];

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) minPrice = prices[i];
    if (prices[i] > minPrice)
      maxProfit = Math.max(maxProfit, prices[i] - minPrice);
  }

  return maxProfit;
};
let prices = [7, 1, 5, 3, 6, 4];
// console.log(maxProfit(prices));

/* Maximum Subarray
  Easy
  Solution
  Given an integer array nums, find the subarray with the largest sum, and return its sum. 
*/
var maxSubArray = function (nums) {
  if (nums.length === 1) return nums[0];

  let sumArr = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    sumArr.push(nums[i] + sumArr[sumArr.length - 1]);
  }

  let min = sumArr[0],
    max = sumArr[0],
    maxVal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxVal = Math.max(maxVal, nums[i]);

    if (sumArr[i] < min) {
      min = sumArr[i];
      if (i == nums.length - 1) return Math.max(maxVal, min);
    }
    if (sumArr[i] >= max) {
      max = sumArr[i];
      if (i == nums.length - 1)
        return Math.max(maxVal, Math.max(max - min, max));
    }
  }

  return Math.max(maxVal, Math.max(max - min, max));
};

var maxSubArray = function (nums) {
  let summArr = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    summArr[i] = Math.max(0, summArr[summArr.length - 1]) + nums[i];
  }

  return Math.max(...summArr);
};

// nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// nums = [5, 4, -1, 7, 8];
nums = [-2, -1];
// nums = [-2, -3, -1];
// nums = [-2, 1];
// nums = [-1, 0, -2];
// nums = [1, 1, -2];
// console.log(maxSubArray(nums));

// module.exports = { maxSubArray, coinChange };

/* Jump Game

  Solution
  You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

  Return true if you can reach the last index, or false otherwise.
 */
var dpCanJump = (nums, ind, memo) => {
  let n = nums.length;
  let range = nums[ind] + ind;

  if (memo[ind] !== -1) return memo[ind];

  if (ind === n - 1) return true;
  if (ind >= n || range === ind) return false;

  let localAns = false;

  for (let j = range; j >= ind + 1; j--) {
    localAns = localAns || dpCanJump(nums, j, memo);
  }

  memo[ind] = localAns;

  return memo[ind];
};

var canJump = function (nums) {
  if (nums.length == 1) return true;

  let memo = new Array(nums.length).fill(-1);

  dpCanJump(nums, 0, memo);

  return memo[0] === true;
};

nums = [2, 3, 1, 1, 4];
nums = [0, 1];
// console.log(canJump(nums));

/////////////////////////////////////////////////////////////////////////// Second Attempt
const climbStairsSecond = (num) => {
  const arr = new Array(n).fill(-1);

  for (let i = 0; i < arr.length; i++) {
    if (i == 0 || i == 1) {
      arr[i] = i + 1;
    } else {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
  }

  return arr[arr.length - 1];
};

const maxProfitSec = (prices) => {
  let minPr = prices[0],
    maxPr = minPr,
    prof = 0;

  for (let i = 0; i < prices.length; i++) {
    maxPr = Math.max(maxPr, prices[i]);

    if (minPr > prices[i]) {
      minPr = prices[i];
      maxPr = minPr;
    }

    prof = Math.max(prof, maxPr - minPr);
  }

  return prof;
};
// console.log(maxProfitSec([7, 6, 4, 3, 1]));
module.exports = { canJump, maxSubArray, coinChange, a2 };
