///////////////////////////* Two Pointers *//////////////

/* Example 4: 392. Is Subsequence.

Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).
 */
var isSubsequence = function (s, t) {
  let i = 0,
    j = 0;

  while (i < s.length && j < t.length) {
    if (s[i] == t[j]) {
      i++;
    }

    j++;
  }

  return i == s.length;
};

/* Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]
*/
var sortedSquares = function (nums) {
  let squareNums = new Array(nums.length).fill(0);
  let i = 0;
  let j = nums.length - 1;
  let final = nums.length - 1;

  while (i <= j) {
    if (Math.abs(nums[i]) > Math.abs(nums[j])) {
      squareNums[final] = nums[i] ** 2;
      i++;
    } else {
      squareNums[final] = nums[j] ** 2;
      j--;
    }

    final--;
  }

  return squareNums;
};

var sortedSquaresMy = function (nums) {
  let arrSquares = [];

  let i = 0;
  let j = i + 1;

  while (Math.abs(nums[i]) >= Math.abs(nums[j]) && j < nums.length) {
    i++;
    j++;
  }

  arrSquares.push(nums[i] * nums[i]);
  i--;

  while (arrSquares.length < nums.length) {
    if (!nums[j]) j = 0;

    if (Math.abs(nums[i]) <= Math.abs(nums[j])) {
      arrSquares.push(nums[i] * nums[i]);
      i--;
    } else {
      arrSquares.push(nums[j] * nums[j]);
      j++;
    }
  }

  return arrSquares;
};

// console.log(sortedSquares([-4, -1, 0, 3, 10]));
// console.log(sortedSquares([-7, -3, 2, 3, 11]));

///////////////////////////* Sliding window *//////////////
const prn = (num) => {
  let left = 0;
  let right = num;

  for (let i = 0; i <= right; i++) {
    console.log(` i: ${i}`);

    // This while loop runs only once for i = 0
    while (left < right) {
      console.log(`left: ${left}/ i: ${i}`);
      left++;
    }
  }
};
// console.log(prn(3));
/* Example 1: Given an array of positive integers nums and an integer k, find the length of the longest subarray whose sum is less than or equal to k.
 */
var findLength = (arr, k) => {
  let left = 0,
    curr = 0,
    ans = 0;

  for (let right = 0; rigth < arr.length; right++) {
    curr += arr[right];

    while (curr > k) {
      curr -= arr[left];
      left++;
    }

    ans = Math.max(ans, right - left + 1);
  }

  return ans;
};

// console.log(prn(5));

/* Example 2: You are given a binary substring s (a string containing only "0" and "1"). An operation involves flipping a "0" into a "1". What is the length of the longest substring containing only "1" after performing at most one operation?

For example, given s = "1101100111", the answer is 5. If you perform the operation at index 2, the string becomes 1111100111.
 */
var longestStr = (str) => {
  let currZeros = 0,
    left = 0,
    answer = 0;

  for (let right = 0; right < str.length; right++) {
    if (str[right] === '0') {
      currZeros++;
    }

    while (currZeros > 1) {
      if (str[left] === '0') {
        currZeros -= 1;
      }
      left++;
    }

    answer = Math.max(answer, right - left + 1);
  }

  return answer;
};

/* Example 3: 713. Subarray Product Less Than K.

Given an array of positive integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.

For example, given the input nums = [10, 5, 2, 6], k = 100, the answer is 8. The subarrays with products less than k are:

[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]

Key idea: Whenever you see a problem asking for the number of subarrays, think of this: at each index, how many valid subarrays end at this index? Let's split the 8 subarrays by their ending indices: 
[10]
[5], [10, 5]
[2], [5, 2]
[6], [2, 6], [5, 2, 6]
Do you notice a pattern? For each index, the number of subarrays ending at that index is the length of the window after reaching that index. For any given ending index right, a subarray could start at any index between left and right, which is a total of right - left + 1 (the window size) starting indices.

For example, after reaching the 2, the product is too large, so we remove the 10. Now, the window is valid, and it has a length of 2. That means that there are 2 valid subarrays that end here.

We can use this idea to solve the problem. Do a normal sliding window with the constraint of the product being less than k, and at each index, add the length of the window (right - left + 1) to the answer.
*/

var numSubarrayProductLessThanK = (arr, k) => {
  let curr = 1;
  left = 0;
  ans = 0;

  for (let right = 0; right < arr.length; right++) {
    curr *= arr[right];

    while (left <= right && curr >= k) {
      curr /= arr[left];

      left++;
    }

    ans += right - left + 1;
  }

  return ans;
};

// console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100));

/* You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted. */

var findMaxAverage = function (nums, k) {
  let avarage = 0,
    ans;
  for (let i = 0; i < k; i++) {
    avarage += nums[i];
  }

  avarage = avarage / k;
  ans = avarage;

  for (let i = k; i < nums.length; i++) {
    avarage += (nums[i] - nums[i - k]) / k;

    ans = Math.max(ans, avarage);
  }

  return ans;
};

// console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4));

/* Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's. */
var longestOnes = function (nums, k) {
  let left = 0,
    ans = 0,
    currZeros = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) currZeros++;

    while (currZeros > k) {
      if (nums[left] === 0) currZeros--;

      left++;
    }

    ans = Math.max(ans, right - left + 1);
  }

  return ans;
};

// console.log(
//   longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3)
// );

///////////////////////////* Prefix sum *//////////////
/* A prefix sum is a technique that can be used with integer arrays. The idea is to create an array prefix where prefix[i] is the sum of all elements up to the index i (inclusive). For example, given nums = [5, 2, 1, 6, 3, 8], we would have prefix = [5, 7, 8, 14, 17, 25].

!!!Prefix sums allow us to find the sum of any subarray in O(1)!!!!. If we want the sum of the subarray from i to j (inclusive), then the answer is prefix[j] - prefix[i - 1], or prefix[j] - prefix[i] + nums[i] if you don't want to deal with the out of bounds case when i = 0.
 */

/* Example 1: Given an integer array nums, an array queries where queries[i] = [x, y] and an integer limit, return a boolean array that represents the answer to each query. A query is true if the sum of the subarray from x to y is less than limit, or false otherwise.

For example, given nums = [1, 6, 3, 2, 7, 2] and queries = [[0, 3], [2, 5], [2, 4]] and limit = 13, the answer is [true, false, true]. For each query, the subarray sums are [12, 14, 12]. */
var answerQueries = (nums, queries, limit) => {
  let sums = [nums[0]],
    ans = [];

  for (let i = 1; i < nums.length; i++) {
    sums.push(nums[i] + sums[sums.length - 1]);
  }

  /* queries.forEach((arr) => {
    let currSum = sums[arr[1]] - sums[arr[0]] + nums[arr[0]];

    ans.push(currSum < limit);
  }); */
  for (const [x, y] of queries) {
    let currSum = sums[y] - sums[x] + nums[x];

    ans.push(currSum < limit);
  }

  return ans;
};
let nums = [1, 6, 3, 2, 7, 2];
let queries = [
  [0, 3],
  [2, 5],
  [2, 4],
];
let limit = 13;
// console.log(answerQueries(nums, queries, limit));

/* Given an integer array nums, find the number of ways to split the array into two parts so that the first section has a sum greater than or equal to the sum of the second section. The second section should have at least one number.

Time Complexity O(n) + O(n) = O(2n) -> O(n)
 */
var waysToSplitArray = (nums) => {
  let sums = [nums[0]],
    res = 0;

  for (let i = 1; i < nums.length; i++) {
    sums.push(nums[i] + sums[sums.length - 1]);
  }

  for (let i = 0; i < nums.length - 1; i++) {
    let currLeft = sums[i];
    let currRight = sums[sums.length - 1] - sums[i];

    if (currLeft >= currRight) res++;
  }

  return res;
};

// OR
// We can improve to O(1)O(1) space while still leveraging the idea of a prefix sum by simply calculating leftSection on the fly.
//
var waysToSplitArray = (nums) => {
  let total = 0,
    res = 0;

  for (const num of nums) {
    total += num;
  }
  let currLeft;

  for (let i = 0; i < nums.length - 1; i++) {
    currLeft += nums[i];
    let currRight = total - currLeft;

    if (currLeft >= currRight) res++;
  }

  return res;
};

/* Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).

Return the running sum of nums. */
var runningSum = function (nums) {
  let sums = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    sums.push(nums[i] + sums[sums.length - 1]);
  }

  return sums;
};

// One more solution
var runningSum = function (nums) {
  let total = 0;
  let sums = nums.map((num) => {
    total += num;

    return total;
  });

  return sums;
};

// console.log(runningSum([3, 1, 2, 10, 1]));

/* Given an array of integers nums, you start with an initial positive value startValue.
In each iteration, you calculate the step by step sum of startValue plus elements in nums (from left to right).
Return the minimum positive value of startValue such that the step by step sum is never less than 1. 

Input: nums = [-3,2,-3,4,2]
Output: 5
Explanation: If you choose startValue = 4, in the third iteration your step by step sum is less than 1.
step by step sum

Input: nums = [1,2]
Output: 1
Explanation: Minimum start value should be positive. 

Input: nums = [1,-2,-3]
Output: 5

Hint #1  
Find the minimum prefix sum.
*/

var minStartValue = function (nums) {
  let sum = 0,
    minSum = nums[0],
    res;

  for (const num of nums) {
    sum += num;

    if (sum < minSum) minSum = sum;
  }

  res = minSum < 0 ? Math.abs(minSum) + 1 : 1;

  return res;
};

var lengthOfLongestSubstring = function (s) {
  if (s.length === 1) return 1;

  let left = 0,
    ans = 0,
    right = 1;
  let window = [s[0]];

  while (right < s.length) {
    if (!window.includes(s[right])) {
      window.push(s[right]);
      right++;
    } else {
      left++;
      window = window.slice(1);
    }

    ans = Math.max(ans, right - left);
  }

  return ans;
};

// The same as above
// but way  FASTER
var lengthOfLongestSubstring = function (s) {
  let l = 0,
    ans = 0,
    uniques = new Map();

  for (let r = 0; r < s.length; r++) {
    uniques.set(s[r], (uniques.get(s[r]) || 0) + 1);

    while (uniques.get(s[r]) > 1 && l <= r) {
      uniques.set(s[l], uniques.get(s[l]) - 1);
      l++;
    }

    ans = Math.max(ans, r - l + 1);
  }

  return ans;
};
// console.log(lengthOfLongestSubstring('abcabcbb'));

/* Longest Palindromic Substring

Given a string s, return the longest palindromic substring in s.

 */

var longestPalindrome = function (s) {
  let ans = s[0],
    ansMax = ans;

  for (let i = 0; i < s.length - 1; i++) {
    let l = i - 1,
      r = i + 1,
      ans = s[i];

    while (r < s.length && s[i] === s[r]) {
      ans = ans + s[r];

      r++;
    }

    while (l >= 0 && r < s.length && s[l] === s[r]) {
      ans = s[l] + ans + s[r];

      l--;
      r++;
    }

    ansMax = ansMax.length > ans.length ? ansMax : ans;
  }

  return ansMax;
};

// console.log(longestPalindrome('klmcivic'));
// console.log(longestPalindrome('baba'));
// console.log(longestPalindrome('ac'));
// console.log(longestPalindrome('bb'));

/* Given an array, rotate the array to the right by k steps, where k is non-negative.
  Input: nums = [1,2,3,4,5,6,7], k = 3
  Output: [5,6,7,1,2,3,4]
  Explanation:
  rotate 1 steps to the right: [7,1,2,3,4,5,6]
  rotate 2 steps to the right: [6,7,1,2,3,4,5]
  rotate 3 steps to the right: [5,6,7,1,2,3,4] 
*/

/*
WORKED but HEAVY 
Hint #1  
The easiest solution would use additional memory and that is perfectly fine.
 */
/* var rotate = function (nums, k) {
  let memoRight = [],
    initLen = nums.length,
    kCopy = k > initLen ? k % initLen : k;

  for (let i = initLen - kCopy; i < initLen; i++) {
    memoRight.push(nums[i]);
  }
  let y = memoRight.length - 1;

  for (let i = initLen - 1; i >= 0; i--) {
    if (i - kCopy >= 0) {
      nums[i] = nums[i - kCopy];
    } else {
      nums[i] = memoRight[y];
      y--;
    }
  }
}; */

/* 
WORKED but not for LARGER INPUTRS
Hint #2  
The actual trick comes when trying to solve this problem without using any additional memory. This means you need to use the original array somehow to move the elements around. Now, we can place each element in its original location and shift all the elements around it to adjust as that would be too costly and most likely will time out on larger input arrays.
 */
/* var rotate = function (nums, k) {
  let left = 0,
    kCopy = k > nums.length ? k % nums.length : k,
    right = nums.length - kCopy;

  while (right < nums.length) {
    let memo = nums[right];

    for (let i = right; i >= left + 1; i--) {
      nums[i] = nums[i - 1];
    }
    nums[left] = memo;

    left++;
    right++;
  }
}; */

/* Hint #3  
One line of thought is based on reversing the array (or parts of it) to obtain the desired result. Think about how reversal might potentially help us out by using an example.
 */
var rotate = function (nums, k) {
  k %= nums.length;
  reverce(nums, 0, nums.length - k - 1);
  reverce(nums, nums.length - k, nums.length - 1);
  reverce(nums, 0, nums.length - 1);

  function reverce(arr, startIndex, endIndex) {
    while (startIndex < endIndex) {
      let tmp;
      tmp = arr[startIndex];
      arr[startIndex] = arr[endIndex];
      arr[endIndex] = tmp;
      endIndex--;
      startIndex++;
    }
  }
};

var rotate = function (nums, k) {
  while (k > 0) {
    nums.unshift(nums.pop());
    --k;
  }

  return nums;
};

var rotate = function (nums, k) {
  k %= nums.length;
  let args = nums.splice(0, nums.length - k);
  if (k !== 0) [].push.apply(nums, args);
};

var rotate = function (nums, k) {
  k %= nums.length;

  if (k !== 0) {
    let tail = nums.splice(0, nums.length - k);
    nums.push(...tail);
  }
};
let nums2 = [1, 2, 3, 4, 5, 6, 7];
rotate(nums2, 3);
console.log(nums2);

var containsDuplicate = function (nums) {
  let left = 0,
    right = 1,
    window = [nums[left]];

  while (right < nums.length) {
    if (window.includes(nums[right])) return true;

    window.push(nums[right]);
    right++;
  }

  return false;
};

var containsDuplicate = function (nums) {
  let container = new Set();

  for (const num of nums) {
    if (container.has(num)) {
      return true;
    } else {
      container.add(num);
    }
  }

  return false;
};
// console.log(containsDuplicate([0, 4, 5, 0, 3, 6]));

/* Group Anagrams

  Given an array of strings strs, group the anagrams together. You can return the answer in any order.

  An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

  

  Example 1:

  Input: strs = ["eat","tea","tan","ate","nat","bat"]
  Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */
var groupAnagrams = function (strs) {
  let uniquesCount = new Map(),
    ans = [];

  for (let word of strs) {
    let localCopy = word.split('').sort().join('');

    if (!uniquesCount.has(localCopy)) {
      uniquesCount.set(localCopy, []);
    }

    uniquesCount.get(localCopy).push(word);
  }

  for (const [key, value] of uniquesCount) {
    ans.push(value);
  }

  return ans;
};

let strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
// console.log(groupAnagrams(strs));

/* Single Number

Solution
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.
 */

var singleNumber = function (nums) {
  let counts = new Map();

  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  for (const [key, value] of counts) {
    if (value === 1) return key;
  }
};

var singleNumber = function (nums) {
  let res = nums.reduce((a, b) => a ^ b);

  return res;
};

// console.log(singleNumber([2, 2, 15]));

class Test {
  constructor(val) {
    this.val = val;
  }
  instanceProp = 'instance prop';
  static staticProp = 'static prop';
}

let a1 = new Test('a1');

Test.prototype.showProp = function () {
  console.log(`Instance prop to show: ${this.instanceProp}`);
};
Test.prototype.showVal = function () {
  console.log(`Val to show: ${this.val}`);
};

// console.log({ a1 });
// console.log(a1.showProp());
// console.log(a1.showVal());
// console.log(Test.staticProp);

/* Increasing Triplet Subsequence

Solution
Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.

 */

// Worked but too heavy
// you DON"T need ind as a result no need to store eacj value as an object
var increasingTriplet2 = function (nums) {
  let first = { val: nums[0], ind: 0 },
    second = null,
    third = null;

  for (let i = 1; i < nums.length; i++) {
    if (second && nums[i] > second.val) third = { val: nums[i], ind: i };

    if (first && second && third) return true;

    if (nums[i] > first.val) second = { val: nums[i], ind: i };

    if (nums[i] < first.val && i > first.ind) {
      first.val = nums[i];
      first.ind = i;
    }
  }

  return false;
};

// Same as above but with better performance = less space complexity
var increasingTriplet = function (nums) {
  let tripple = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    if (tripple.length > 1 && nums[i] > tripple[1]) tripple.push(nums[i]);

    if (tripple.length === 3) return true;

    if (nums[i] > tripple[0] && nums[i] != tripple[1]) tripple[1] = nums[i];

    if (nums[i] < tripple[0]) {
      tripple[0] = nums[i];
    }
  }

  return false;
};

// console.log(increasingTriplet([20, 100, 10, 12, 1, 2, 15]));
// console.log(increasingTriplet([1, 0, -1, 0, 0, 100000000]));
// console.log(increasingTriplet([1, 2, 3, 4, 5]));
// console.log(increasingTriplet([5, 4, 3, 2, 1]));

/* Sort Colors

  Solution
  Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

  We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

  You must solve this problem without using the library's sort function. 
  
*/
var sortColors = function (nums) {
  let counts = { mins: 0, mids: 0, maxs: 0 };

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 0) counts.mins++;
    if (nums[i] == 1) counts.mids++;
    if (nums[i] == 2) counts.maxs++;
  }

  for (let i = 0; i < nums.length; i++) {
    if (i < counts.mins) {
      nums[i] = 0;
    } else if (i < counts.mins + counts.mids && i >= counts.mins) {
      nums[i] = 1;
    } else {
      nums[i] = 2;
    }
  }

  return nums;
};

// console.log(sortColors([2, 0, 2, 1, 1, 0]));

/* Search for a Range

  Solution
  Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

  If target is not found in the array, return [-1, -1].

  You must write an algorithm with O(log n) runtime complexity. 
*/
var searchRange = function (nums, target, start = 0, end = nums.length - 1) {
  if (start === end || end < start) {
    return nums[start] !== target ? [-1, -1] : [start, end];
  }

  let mid = Math.floor(start + (end - start) / 2),
    left = mid,
    right = mid;

  if (target === nums[mid]) {
    while (nums[left - 1] === target) {
      left--;
    }

    while (nums[right + 1] === target) {
      right++;
    }

    return [left, right];
  }

  return target > nums[mid]
    ? searchRange(nums, target, (start = mid + 1), end)
    : searchRange(nums, target, start, (end = mid - 1));
};

// Iterative solution
var searchRange = function (nums, target) {
  if (nums.length === 0) return [-1, -1];

  let start = 0,
    end = nums.length - 1,
    mid;

  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2);
    //
    let left = mid,
      right = mid;

    if (nums[mid] === target) {
      while (nums[left - 1] === target) {
        left--;
      }

      while (nums[right + 1] === target) {
        right++;
      }

      return [left, right];
    }

    if (target > nums[mid]) start = mid + 1;
    if (target < nums[mid]) end = mid - 1;
  }

  if (nums[mid] !== target) return [-1, -1];
};

(nums = [8]), (target = -8);
// console.log(searchRange(nums, target));

/* Merge Intervals

  Solution
  Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

  

  Example 1:

  Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
  Output: [[1,6],[8,10],[15,18]]
  Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 */

/// NOT SOLVED
// Probably some gaps in te description
/* var merge = function (intervals) {
  let ans = [],
    prev = intervals[0];

  for (let i = 0; i < intervals.length; i++) {
    let prevLast = prev[1],
      prevFirst = prev[0],
      curFirst = intervals[i][0],
      curLast = intervals[i][1];

    if (curFirst < prevFirst) {
      prev[0] = curFirst;

      if (curLast >= prevLast) prev[1] = curLast;
    } else if (curFirst <= prevLast) {
      if (curLast > prevLast) prev[1] = curLast;
    } else {
      ans.push(prev);
      prev = intervals[i];
    }

    if (i === intervals.length - 1) ans.push(prev);
  }

  return ans;
};

var merge = function (intervals) {
  let ans = [];

  for (let i = 0; i < intervals.length; i++) {
    let prev = ans[ans.length - 1];
    if (!prev) {
      ans.push(intervals[i]);
    } else {
      if (
        (intervals[i][0] <= prev[0] || intervals[i][0] <= prev[1]) &&
        intervals[i][1] - intervals[i][0]
      ) {
        prev[0] = Math.min(prev[0], intervals[i][0]);
        prev[1] = Math.max(prev[1], intervals[i][1]);
      } else {
        if (!(intervals[i][1] - intervals[i][0]) && intervals[i][0] < prev[0]) {
          ans.unshift(intervals[i]);
        } else {
          ans.push(intervals[i]);
        }
      }
    }
  }

  return ans;
};

var merge = function (intervals) {
  let ans = [],
    stack = [];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    if (!stack.length) {
      stack.push(interval);
    } else {
      let 
      for (const bound of interval) {
      
      }
    }
  }
  return ans;
};
let intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];

// intervals = [[1, 4]];
// intervals = [
//   [1, 4],
//   [2, 3],
// ];
// console.log(merge(intervals)); */

/* Search in Rotated Sorted Array

  Solution
  There is an integer array nums sorted in ascending order (with distinct values).

  Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

  Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

  You must write an algorithm with O(log n) runtime complexity.

    Example 1:

  Input: nums = [4,5,6,7,0,1,2], target = 0
  Output: 4
 */

// Working BUT NOT O(log n) solution
// Its O(n + log n)
var rotatedBinarySearch = (nums, target, start, end) => {
  if (target < nums[start] || target > nums[end]) return -1;

  while (start <= end) {
    if (target === nums[start]) return start;
    if (target === nums[end]) return end;

    let mid = Math.floor(start + (end - start) / 2);
    if (target === nums[mid]) return mid;

    if (target > nums[mid]) start = mid + 1;
    if (target < nums[mid]) end = mid - 1;
  }

  return -1;
};

var search = function (nums, target) {
  //Check if swiped
  let rotated = nums[0] > nums[nums.length - 1];
  if (rotated) {
    // Yes: 1. find  new pivot index
    let newPivot = -1;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] < nums[i - 1]) newPivot = i;
    }
    // 2. perform binary search on input arr
    //  define in wich part of swiped arr the T is located [start-pivot] or [pivot-end]
    if (target > nums[nums.length - 1]) {
      return rotatedBinarySearch(nums, target, 0, newPivot - 1);
    } else {
      return rotatedBinarySearch(nums, target, newPivot, nums.length - 1);
    }
  } else {
    // No: 1. perform binary search on input arr
    return rotatedBinarySearch(nums, target, 0, nums.length - 1);
  }
};

(nums = [4, 5, 6, 7, 0, 1, 2]), (target = 0);
// (nums = [4, 5, 6, 7, 0, 1, 2]), (target = 3);
console.log(search(nums, target));
