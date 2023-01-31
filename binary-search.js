/* Binary Search
  Easy
  7.6K
  166
  Companies
  Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

  You must write an algorithm with O(log n) runtime complexity.
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((right + left) / 2);

    if (nums[mid] === target) return mid;

    if (nums[mid] > target) {
      right = mid - 1;
    }
    if (nums[mid] < target) {
      left = mid + 1;
    }
  }

  return -1;
};

let nums = [-1, 0, 3, 5, 9, 12],
  target = 9;

// console.log(search(nums, target));

/* Search a 2D Matrix
  Medium
  10.9K
  323
  Companies
  You are given an m x n integer matrix matrix with the following two properties:

  Each row is sorted in non-decreasing order.
  The first integer of each row is greater than the last integer of the previous row.
  Given an integer target, return true if target is in matrix or false otherwise.

  You must write a solution in O(log(m * n)) time complexity.
*/

var searchMatrix = function (matrix, target) {
  let m = matrix.length,
    n = matrix[0].length,
    left = 0,
    right = m * n - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    let row = Math.floor(mid / n);
    let col = mid % n;

    if (matrix[row][col] == target) return true;
    if (matrix[row][col] > target) right = mid - 1;

    if (matrix[row][col] < target) left = mid + 1;
  }

  return false;
};

/* Successful Pairs of Spells and Potions
  Medium
  434
  12
  Companies
  You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.

  You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.

  Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.
 */
var successfulPairs = function (spells, potions, success) {
  let ans = [];
  // sort potions asc
  let potSorted = [...potions].sort((a, b) => a - b);

  for (let i = 0; i < spells.length; i++) {
    let left = 0,
      right = potions.length - 1;
    let target = success / spells[i];
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (potSorted[mid] >= target) right = mid - 1;
      if (potSorted[mid] < target) left = mid + 1;
    }

    ans.push(potions.length - left);
  }
  return ans;
};
let spells = [5, 1, 3],
  potions = [1, 2, 3, 4, 5],
  success = 7;
(spells = [3, 1, 2]), (potions = [8, 5, 8]), (success = 16);
// console.log(successfulPairs(spells, potions, success));

/* Search Insert Position

  Solution
  Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

  You must write an algorithm with O(log n) runtime complexity.
 */
var searchInsert = function (nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((right + left) / 2);
    if (nums[mid] === target) return mid;

    if (nums[mid] > target) right = mid - 1;
    if (nums[mid] < target) left = mid + 1;
  }

  return target > nums[left] ? left + 1 : left;
};
(nums = [1, 3, 5, 6]), (target = 7);
(nums = [1, 3, 5, 6]), (target = 0);
// console.log(searchInsert(nums, target));

var answerQueries = function (nums, queries) {
  let ans = [];
  nums.sort((a, b) => a - b);

  for (const query of queries) {
    let right = 0,
      curSum = nums[right];

    while (curSum <= query && right < nums.length) {
      right++;
      curSum += nums[right];
    }

    ans.push(right);
  }

  return ans;
};

const binarySearchQueries = (arr, query) => {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (query >= arr[mid]) left = mid + 1;
    if (query < arr[mid]) right = mid - 1;
  }

  return left;
};

var answerQueries = function (nums, queries) {
  let ans = [];
  nums.sort((a, b) => a - b);
  let sumArr = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    let curSum = sumArr[sumArr.length - 1];
    curSum += nums[i];

    sumArr[i] = curSum;
  }

  for (const query of queries) {
    let index = binarySearchQueries(sumArr, query);

    ans.push(index);
  }

  return ans;
};
(nums = [4, 5, 2, 1]), (queries = [3, 10, 21]);
// (nums = [2, 3, 4, 5]), (queries = [1]);
// console.log(answerQueries(nums, queries));
