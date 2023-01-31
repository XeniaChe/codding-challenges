/* Example 1: 20. Valid Parentheses

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. The string is valid if all open brackets are closed by the same type of closing bracket in the correct order, and each closing bracket closes exactly one open bracket.

For example, s = "({})" and s = "(){}[]" are valid, but s = "(]" and s = "({)}" are not valid. */

var isValid = function (s) {
  let walids = { '{': '}', '(': ')', '[': ']' },
    stack = [];

  for (const char of s) {
    if (walids[char]) {
      stack.push(char);
    } else {
      let latest = stack.pop();

      if (walids[latest] !== char) return false;
    }
  }

  return stack.length === 0;
};

/* 1047. Remove All Adjacent Duplicates In String
Easy
You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.

Example 1:

Input: s = "abbaca"
Output: "ca"
 */

/* var removeDuplicates = function (s) {
  let uniques = new Set(),
    stack = [];

  for (const char of s) {
    if (uniques.has(char) && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      uniques.add(char);

      stack.push(char);
    }
  }

  return stack.join('');
};
 */
var removeDuplicates = function (s) {
  let stack = [];

  for (const char of s) {
    if (stack.length && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.join('');
};
let str = 'abbaca';
// console.log(removeDuplicates(str));

/* Backspace String Compare
Easy
Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

Note that after backspacing an empty text, the text will continue empty. 
Example 1:

Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".
Example 2:

Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".
Example 3:

Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c" while t becomes "b".*/
const buildStack = (str) => {
  const stack = [];

  for (const char of str) {
    if (char === '#') {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.join('');
};

var backspaceCompare = function (s, t) {
  return buildStack(s) === buildStack(t);
};
let s = 'y#fo##f',
  t = 'y#f#o##f';
// console.log(backspaceCompare(s, t));

/* Simplify Path
Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.

In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.

The canonical path should have the following format:

The path starts with a single slash '/'.
Any two directories are separated by a single slash '/'.
The path does not end with a trailing '/'.
The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period '.' or double period '..')
Return the simplified canonical path.
 */
var simplifyPath = function (path) {
  const stack = [],
    arrPath = path.split('/');

  for (let i = 0; i < arrPath.length; i++) {
    const segment = arrPath[i];

    if (segment !== '.' && segment !== '..' && segment !== '')
      stack.push(segment);

    if (segment === '..') stack.pop();
  }

  return '/' + stack.join('/');
};

let path = '//home/';
// console.log(simplifyPath(path));

/* Make The String Great

Given a string s of lower and upper case English letters.

A good string is a string which doesn't have two adjacent characters s[i] and s[i + 1] where:

0 <= i <= s.length - 2
s[i] is a lower-case letter and s[i + 1] is the same letter but in upper-case or vice-versa.
To make the string good, you can choose two adjacent characters that make the string bad and remove them. You can keep doing this until the string becomes good.

Return the string after making it good. The answer is guaranteed to be unique under the given constraints.

Notice that an empty string is also good.
 
Input: s = "abBAcC"
Output: ""
Explanation: We have many possible scenarios, and all lead to the same answer. For example:
"abBAcC" --> "aAcC" --> "cC" --> ""
"abBAcC" --> "abBA" --> "aA" --> ""
*/
var makeGood = function (s) {
  let stack = [],
    letters = new Map();

  for (let i = 0; i < s.length - 2; i++) {
    let prev = stack[stack.length - 1] || '';

    if (
      (letters.has(s[i]) && letters.get(s[i]) === prev) ||
      (letters.has(prev) && letters.get(prev) === s[i])
    ) {
      stack.pop();
    } else {
      stack.push(s[i]);
      letters.set(s[i].toUpperCase(), s[i].toLowerCase());
    }
  }

  return stack.join('');
};

// The same as above
// But lower Space Complexity
var makeGood = function (s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let prev = stack[stack.length - 1] || '';

    if (
      s[i] !== prev &&
      (s[i].toUpperCase() === prev || prev.toUpperCase() === s[i])
    ) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }

  return stack.join('');
};

///////////////////////////////////////////// ********************* QUEUES
/* Number of Recent Calls
Easy

You have a RecentCounter class which counts the number of recent requests within a certain time frame.

Implement the RecentCounter class:

RecentCounter() Initializes the counter with zero recent requests.
int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t].
It is guaranteed that every call to ping uses a strictly larger value of t than the previous call. 

Input
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
Output
[null, 1, 2, 3, 3]

Explanation
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3
*/
var RecentCounter = function () {
  this.queue = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  while (this.queue.length && this.queue[0] < t - 3000) {
    this.queue.shift();
  }

  this.queue.push(t);

  return this.queue.length;
};

// ********************* MONOTONIC stacks AND queues
/* Daily Temperatures
Medium

Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead. 

Example 2:

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]*/
var dailyTemperatures = function (temperatures) {
  let stack = [],
    answer = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length &&
      temperatures[stack[stack.length - 1]] < temperatures[i]
    ) {
      let j = stack.pop();

      answer[j] = i - j;
    }

    stack.push(i);
  }

  return answer;
};
// console.log(dailyTemperatures([30, 40, 20, 10, 7, 50, 60]));

/* Sliding Window Maximum
Hard

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.
Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
*/

var maxSlidingWindow = function (nums, k) {
  let queue = [],
    answer = [];

  for (let i = 0; i < nums.length; i++) {
    if (queue[0] + k === i) {
      queue.shift();
    }
    while (queue.length && nums[queue[queue.length - 1]] < nums[i]) queue.pop();
    queue.push(i);

    if (i >= k - 1) answer.push(nums[queue[0]]);
  }

  return answer;
};
// let nums = [1, 3, 1, 2, 0, 5],
// k = 3;
// console.log(maxSlidingWindow(nums, k));

/* Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
Medium

Companies
Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to limit.

 */
var longestSubarray = function (nums, limit) {
  let mins = [],
    maxs = [],
    left = 0,
    ans = 0;

  for (let right = 0; right < nums.length; right++) {
    while (mins.length && mins[mins.length - 1] > nums[right]) {
      mins.pop();
    }

    while (maxs.length && maxs[maxs.length - 1] < nums[right]) {
      maxs.pop();
    }

    mins.push(nums[right]);
    maxs.push(nums[right]);

    while (maxs[0] - mins[0] > limit) {
      if (nums[left] === mins[0]) mins.shift();

      if (nums[left] === maxs[0]) maxs.shift();

      left++;
    }

    ans = Math.max(ans, right - left + 1);
  }

  return ans;
};

let nums = [10, 1, 2, 4, 7, 2],
  limit = 5;
// console.log(longestSubarray(nums, limit));

/* Next Greater Element I

Solution
The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

Example 1:
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
*/
var nextGreaterElement = function (nums1, nums2) {
  let nums2ToNextMax = new Map(),
    maxes = [],
    ans = [];

  for (const num2 of nums2) {
    while (maxes.length && maxes[maxes.length - 1] < num2) {
      let prev = maxes.pop();

      nums2ToNextMax.set(prev, num2);
    }

    maxes.push(num2);
  }

  for (const num of nums1) {
    let nextMax = nums2ToNextMax.get(num) || -1;
    ans.push(nextMax);
  }

  return ans;
};
let nums1 = [4, 1, 2],
  nums2 = [1, 3, 4, 2];
// console.log(nextGreaterElement(nums1, nums2));

/* Online Stock Span

  Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

  The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

  For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days.
  Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.
  Implement the StockSpanner class:

  StockSpanner() Initializes the object of the class.
  int next(int price) Returns the span of the stock's price given that today's price is price.
 
  Example 1:
  Input
  ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
  [[], [100], [80], [60], [70], [60], [75], [85]]
  Output
  [null, 1, 1, 1, 2, 1, 4, 6]
*/

var StockSpanner = function () {
  this.prices = [];
  this.priceToRes = new Map();
};

StockSpanner.prototype.next = function (price) {
  let count = 1,
    prices = this.prices;

  while (prices.length && prices[prices.length - 1] <= price) {
    let prevPrice = prices.pop();
    let prevRes = this.priceToRes.get(prevPrice);

    count += prevRes;
  }

  this.prices.push(price);
  this.priceToRes.set(price, count);

  return count;
};
let SSpanner = new StockSpanner();

let counts = [5, 56, 66, 91, 71, 72, 75, 69, 95, 94];
counts.forEach((c) => console.log(SSpanner.next(c)));
