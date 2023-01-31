/* Checking for existence
 */ /* 
  One of the most common applications of a hash table or set is determining if an element exists in O(1). Since an array needs O(n) to do this, using a hash map or set can improve the time complexity of an algorithm greatly, usually from O(n^2) to O(n)ю Let's look at some example problems. */

/*   Example 1: 1. Two Sum
  Given an array of integers nums and an integer target, return indices of two numbers such that they add up to target. You cannot use the same index twice.

  ______________________________
  We can build a hash map as we iterate along the array, mapping each value to it's index. At each index i, where num = nums[i], we can check our hash map for target - num. Adding key-value pairs and checking for   target - num are all O(1), so our time complexity will improve to O(n).
 */

var twoSum = function (nums, target) {
  let dictionary = new Map();

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    let complement = target - num;

    // here key are nums,  values are indices
    if (dictionary.has(complement)) {
      return [i, dictionary.get(complement)];
    }

    // Set num as key, index as value
    dictionary.set(num, i);
  }

  return [-1, -1];
};

/* If the question wanted us to return a boolean indicating if a pair exists or to return the numbers themselves, then we could just use a set. However, since it wants the indices of the numbers, we need to use a hash map to "remember" what indices the numbers are at. */

var twoSum = function (nums, target) {
  let dictionary = new Set();

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    let complement = target - num;

    if (dictionary.has(complement)) return true;

    dictionary.add(num);
  }

  return false;
};

// console.log(twoSum([1, 3, 4, 5, 7], 10));

/* Example 2: 2351. First Letter to Appear Twice

Given a string s, return the first character to appear twice. It is guaranteed that the input will have a duplicate character. */

var retStr = (str) => {
  let container = new Set();

  for (const letter of str) {
    if (container.has(letter)) return letter;

    container.add(letter);
  }
};

// The same but + index
var retStr = (str) => {
  let container = new Map();

  for (let i = 0; i < str.length; i++) {
    if (container.has(str[i])) return `Letter: ${str[i]}, index: ${i}`;

    container.set(str[i], i);
  }
};

// console.log(retStr('civic'));

/* Given a string sentence containing only lowercase English letters, return true if sentence is a pangram, or false otherwise.
A pangram is a sentence where every letter of the English alphabet appears at least once.

Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
Output: true
Explanation: sentence contains at least one of every letter of the English alphabet.
 */
var checkIfPangram = function (sentence) {
  let container = new Set(sentence);

  return container.size === 26;
};

/* Missing Number
Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array. 

Example 1:

Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the rang*/

var missingNumber = function (nums) {
  let container = new Set(nums);
  let i = 0;

  while (i < container.size) {
    if (!container.has(i)) return i;

    i++;
  }
};

var missingNumber = function (nums) {
  let curSum = 0,
    targetSum = 0,
    i = 0;
  while (i < nums.length) {
    curSum += nums[i];
    targetSum += i;

    i++;
  }
  targetSum += i;

  return targetSum - curSum;
};

// console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));

/* Counting Elements

  Given an integer array arr, count how many elements x there are, such that x + 1 is also in arr. If there are duplicates in arr, count them separately.

  Example 1:

  Input: arr = [1,2,3]
  Output: 2
  Explanation: 1 and 2 are counted cause 2 and 3 are in arr.
 */

var countElements = function (arr) {
  let res = 0;
  let container = new Set(arr);

  for (const el of arr) {
    if (container.has(el + 1)) res++;
  }

  return res;
};
// console.log(countElements([1, 2, 3]));

/* COUNTING */

/* Example 1: You are given a string s and an integer k. Find the length of the longest substring that contains at most k distinct characters.

For example, given s = "eceba" and k = 2, return 3. The longest substring with at most 2 distinct characters is "ece".
 */
var eseba = (s, k) => {
  let left = 0,
    len = 0,
    container = new Map();

  for (let right = 0; right < s.length; right++) {
    container.set(s[right], (container.get(s[right]) || 0) + 1);

    while (container.size > k) {
      container.set(s[left], container.get(s[left]) - 1);
      if (container.get(s[left]) === 0) container.delete(s[left]);

      left++;
    }

    len = Math.max(len, right - left + 1);
  }

  return len;
};

// OR //
var eseba = (s, k) => {
  let left = 0,
    len = 0,
    container = new Set(s[left]);

  for (let right = 1; right < s.length; right++) {
    if (!container.has(s[right])) {
      container.add(s[right]);
    }

    while (container.size > k) {
      container.delete(s[left]);
      left++;
    }

    len = Math.max(len, right - left + 1);
  }

  return len;
};

// console.log(eseba('eceeeeeeeba', 2));
let str = 'ahhha';
var build = (str) => {
  let container = new Map();

  for (const letter of str) {
    container.set(letter, /* letter */ (container.get(letter) || 0) + 1);
  }

  return container;
};
// console.log(build(str));

/* Example 2: 2248. Intersection of Multiple Arrays

Given a 2D array nums that contains n arrays of distinct integers, return a sorted array containing all the numbers that appear in all n arrays.

For example, given nums = [[3,1,2,4,5],[1,2,3,4],[3,4,5,6]], return [3, 4]. 3 and 4 are the only numbers that are in all arrays.
 */

var reerr = (nums) => {
  let counts = new Map(),
    res = [];

  for (const arr of nums) {
    for (const num of arr) {
      counts.set(num, (counts.get(num) || 0) + 1);
    }
  }

  for (const [key, value] of counts) {
    if (value === nums.length) res.push(key);
  }

  return res.sort((a, b) => a - b);
};

/* Example 3: 1941. Check if All Characters Have Equal Number of Occurrences

Given a string s, determine if all characters have the same frequency.

For example, given s = "abacbc", return true. All characters appear twice. Given s = "aaabb", return false. "a" appears 3 times, "b" appears 2 times. 3 != 2.
 */

var occurence = (s) => {
  let counts = new Map(),
    countsUnique = new Set();

  for (const letter of s) {
    counts.set(letter, (counts.get(letter) || 0) + 1);
  }

  // If all letters have the same frequency the size of countsUnique
  // should be 1 since Set() ignores dublicates
  for (const value of counts) {
    countsUnique.add(value);
  }

  return countsUnique.size === 1;
};

/* 
////////// Count the number of subarrays with an "exact" constraint //////////


SLIDING WINDOW modified for an "exact" constrain
Example 4: 560. Subarray Sum Equals K

Given an integer array nums and an integer k, find the number of subarrays whose sum is equal to k. */

// Can NOT use Set() to track counts or set the value for each currSum in Map() to 1  cos if nums are
// NOT ONLY POSITIVE NUMBERS the same currSum can appear more than once
var subArr = (nums, k) => {
  let ans = 0,
    counts = new Map(),
    currSum = 0;
  counts.set(0, 1);

  for (const num of nums) {
    currSum = num + currSum;

    ans += counts.get(currSum - k) || 0;

    counts.set(currSum, (counts.get(currSum) || 0) + 1);
  }

  return ans;
};

// console.log(subArr([1, -1, 0], 0));

/* Example 5: 1248. Count Number of Nice Subarrays

Given an array of positive integers nums and an integer k. Find the number of subarrays with exactly k odd numbers in them.

For example, given nums = [1, 1, 2, 1, 1], k = 3, the answer is 2. The subarrays with 3 odd numbers in them are [1, 1, 2, 1, 1] and [1, 1, 2, 1, 1].
 */

var numberOfSubarrays = (nums, k) => {
  let counts = new Map(),
    curr = 0,
    ans = 0;

  counts.set(0, 1);

  for (const num of nums) {
    curr += num % 2;
    // if (num % 2) {
    //   curr += 1;
    //   counts.set(curr, 1);
    // }

    ans += counts.get(curr - k) || 0;
    counts.set(curr, (counts.get(curr) || 0) + 1);
  }

  return ans;
};

// console.log(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2));

/* Find Players With Zero or One Losses
You are given an integer array matches where matches[i] = [winneri, loseri] indicates that the player winneri defeated player loseri in a match.

Return a list answer of size 2 where:

answer[0] is a list of all players that have not lost any matches.
answer[1] is a list of all players that have lost exactly one match.
The values in the two lists should be returned in increasing order.

Note:

You should only consider the players that have played at least one match.
The testcases will be generated such that no two matches will have the same outcome.
 

Example 1:

Input: matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
Output: [[1,2,10],[4,5,7,8]]
Explanation:
Players 1, 2, and 10 have not lost any matches.
Players 4, 5, 7, and 8 each have lost one match.
Players 3, 6, and 9 each have lost two matches.
Thus, answer[0] = [1,2,10] and answer[1] = [4,5,7,8].
 */
var findWinners = function (matches) {
  let looserFrequency = new Map(),
    players = new Set(),
    winners = [],
    loosers = [];

  for (const [win, loos] of matches) {
    players.add(win);
    players.add(loos);

    looserFrequency.set(loos, (looserFrequency.get(loos) || 0) + 1);
  }

  for (const player of players) {
    if (!looserFrequency.get(player)) winners.push(player);

    if (looserFrequency.get(player) === 1) loosers.push(player);
  }

  winners.sort((a, b) => a - b);
  loosers.sort((a, b) => a - b);

  return [winners, loosers];
};
let matches = [
  [1, 3],
  [2, 3],
  [3, 6],
  [5, 6],
  [5, 7],
  [4, 5],
  [4, 8],
  [4, 9],
  [10, 4],
  [10, 9],
];
// console.log(findWinners(matches));

/* Largest Unique Number

  Given an integer array nums, return the largest integer that only occurs once. If no integer occurs once, return -1.

  

  Example 1:

  Input: nums = [5,7,3,9,4,9,8,3,1]
  Output: 8
  Explanation: The maximum integer in the array is 9 but it is repeated. The number 8 occurs only once, so it is the answer.
 */
var largestUniqueNumber = function (nums) {
  let allFrequencies = new Map(),
    maxSingle = -1;

  for (const num of nums) {
    allFrequencies.set(num, (allFrequencies.get(num) || 0) + 1);
  }

  // For some reason when accumulating to {}, the nums are getting sorted ascendingly
  // BUT when when accumulating to new Map() the sorting does NOT happen
  /*   allFrequencies = nums.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {}); */

  /*   nums.reduce((acc, num) => {
    acc.set(num, (acc.get(num) || 0) + 1);
    return acc;
  }, allFrequencies);
 */

  for (const [key, value] of allFrequencies) {
    if (value === 1) {
      if (key > maxSingle) maxSingle = key;
    }
  }

  return maxSingle;
};

// Also working
var largestUniqueNumber = function (nums) {
  const freqs = nums.reduce((acc, curr) => {
    acc[curr] = (acc[curr] ?? 0) + 1;
    return acc;
  }, {});

  const keys = Object.keys(freqs);
  for (let i = keys.length - 1; i >= 0; i--) {
    if (freqs[keys[i]] === 1) {
      let res = Number(keys[i]);
      return res;
    }
  }
  return -1;
};
// console.log(largestUniqueNumber([5, 7, 3, 9, 4, 9, 8, 3, 1]));

/* Maximum Number of Balloons

  Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.

  You can use each character in text at most once. Return the maximum number of instances that can be formed.

  Example 1:
Input: text = "nlaebolko"
Output: 1
 */
var maxNumberOfBalloons = function (text) {
  let frequencies = new Map(),
    targetWord = 'balloon',
    targetFrequencies = [];

  // collect input's frequencies
  for (let i = 0; i < text.length; i++) {
    frequencies.set(text[i], (frequencies.get(text[i]) || 0) + 1);
  }

  // loop ove 'baloon' and store every letter's freq. in sorted(?) arr
  for (let i = 0; i < targetWord.length; i++) {
    let curFrequency = frequencies.get(targetWord[i]) || 0;

    if (targetWord[i] === 'l' || targetWord[i] === 'o')
      curFrequency = Math.trunc(curFrequency / 2);

    targetFrequencies.push(curFrequency);
  }

  targetFrequencies.sort((a, b) => a - b);

  return targetFrequencies[0];
};
let text =
  'krhizmmgmcrecekgyljqkldocicziihtgpqwbticmvuyznragqoyrukzopfmjhjjxemsxmrsxuqmnkrzhgvtgdgtykhcglurvppvcwhrhrjoislonvvglhdciilduvuiebmffaagxerjeewmtcwmhmtwlxtvlbocczlrppmpjbpnifqtlninyzjtmazxdbzwxthpvrfulvrspycqcghuopjirzoeuqhetnbrcdakilzmklxwudxxhwilasbjjhhfgghogqoofsufysmcqeilaivtmfziumjloewbkjvaahsaaggteppqyuoylgpbdwqubaalfwcqrjeycjbbpifjbpigjdnnswocusuprydgrtxuaojeriigwumlovafxnpibjopjfqzrwemoinmptxddgcszmfprdrichjeqcvikynzigleaajcysusqasqadjemgnyvmzmbcfrttrzonwafrnedglhpudovigwvpimttiketopkvqw';
// console.log(maxNumberOfBalloons(text));

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
    // The same as above
    /*     localCopy.sort((a, b) => (a < b ? -1 : 1));
      localCopy = localCopy.join('');
 */
    if (!uniquesCount.has(localCopy)) {
      uniquesCount.set(localCopy, []);
    }

    uniquesCount.get(localCopy).push(word);

    // The same as above
    /*     let groupArr = uniquesCount.get(localCopy) || [];
      groupArr.push(word);

      uniquesCount.set(localCopy, groupArr);
 */
  }

  for (const [key, value] of uniquesCount) {
    ans.push(value);
  }

  return ans;
};

let strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
// console.log(groupAnagrams(strs));

/* 2260. Minimum Consecutive Cards to Pick Up
You are given an integer array cards where cards[i] represents the value of the ith card. A pair of cards are matching if the cards have the same value.

Return the minimum number of consecutive cards you have to pick up to have a pair of matching cards among the picked cards. If it is impossible to have matching cards, return -1.

Example 1:

Input: cards = [3,4,2,3,4,7]
Output: 4
Explanation: We can pick up the cards [3,4,2,3] which contain a matching pair of cards with value 3. Note that picking up the cards [4,2,3,4] is also optimal.
 

EXPLANATION: Given an integer array cards, find the length of the shortest subarray that contains at least one duplicate. If the array has no duplicates, return -1.*/

var minimumCardPickup = function (cards) {
  let occurences = new Map(),
    minLength = cards.length + 1;

  for (let i = 0; i < cards.length; i++) {
    if (occurences.has(cards[i])) {
      let right = i;

      minLength = Math.min(minLength, right - occurences.get(cards[i]) + 1);
    }
    occurences.set(cards[i], i);
  }

  return minLength <= cards.length ? minLength : -1;
};
let cards = [3, 4, 2, 3, 4, 7];
// console.log(minimumCardPickup(cards));

/* 2342. Max Sum of a Pair With Equal Sum of Digits
You are given a 0-indexed array nums consisting of positive integers. You can choose two indices i and j, such that i != j, and the sum of digits of the number nums[i] is equal to that of nums[j].

Return the maximum value of nums[i] + nums[j] that you can obtain over all possible indices i and j that satisfy the conditions.

Example 1:

Input: nums = [18,43,36,13,7]
Output: 54
Explanation: The pairs (i, j) that satisfy the conditions are:
- (0, 2), both numbers have a sum of digits equal to 9, and their sum is 18 + 36 = 54.
- (1, 4), both numbers have a sum of digits equal to 7, and their sum is 43 + 7 = 50.
So the maximum sum that we can obtain is 54.
 */

var maximumSum = function (nums) {
  let occurences = new Map(),
    maxRes = -1;

  for (let num of nums) {
    let currSum = 0;
    let local = num;
    // Get the sum of all num's digits
    while (local > 0) {
      currSum += local % 10;

      local = Math.floor(local / 10);
    }

    if (occurences.has(currSum)) {
      let localRes = num + occurences.get(currSum);

      maxRes = Math.max(maxRes, localRes);
    }

    occurences.set(currSum, Math.max(occurences.get(currSum) || 0, num));
  }

  return maxRes;
};
let nums = [
  279, 169, 463, 252, 94, 455, 423, 315, 288, 64, 494, 337, 409, 283, 283, 477,
  248, 8, 89, 166, 188, 186, 128,
];

// console.log(maximumSum(nums));

/* 2352. Equal Row and Column Pairs
Medium
Given a 0-indexed n x n integer matrix grid, return the number of pairs (ri, cj) such that row ri and column cj are equal.

A row and column pair is considered equal if they contain the same elements in the same order (i.e., an 
  equal array). */

var equalPairs = function (grid) {
  let rowsFrequency = new Map(),
    colFrequency = new Map(),
    res = 0,
    col = 0;

  for (const arr of grid) {
    let rowStr = arr.join('-');

    rowsFrequency.set(rowStr, (rowsFrequency.get(rowStr) || 0) + 1);
  }

  while (col < grid[0].length) {
    let strArr = [];
    for (const arr of grid) {
      strArr.push(arr[col]);
    }

    let colStr = strArr.join('-');
    colFrequency.set(colStr, (colFrequency.get(colStr) || 0) + 1);

    col++;
  }

  for (const [key, value] of rowsFrequency) {
    if (colFrequency.has(key)) {
      res += value * colFrequency.get(key);
    }
  }
  return res;
};

let grid = [
  [3, 2, 1],
  [1, 7, 6],
  [2, 7, 7],
];
// console.log(equalPairs(grid));

/* Ransom Note

Solution
Given two strings 'ransomNote' and 'magazine', return true if 'ransomNote' can be constructed by using the letters from 'magazine' and false otherwise.

Each letter in 'magazine' can only be used once in 'ransomNote'.
 */
var canConstruct = function (ransomNote, magazine) {
  let magazineMap = new Map();

  for (const letter of magazine) {
    magazineMap.set(letter, (magazineMap.get(letter) || 0) + 1);
  }

  for (const letter of ransomNote) {
    if (!magazineMap.has(letter)) return false;

    let countNext = magazineMap.get(letter) - 1;
    if (countNext === 0) {
      magazineMap.delete(letter);
    } else {
      magazineMap.set(letter, countNext);
    }
  }

  return true;
};
let magazine = 'aab';
let ransomNote = 'aa';
// console.log(canConstruct(ransomNote, magazine));

/* Jewels and Stones

You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. Each character in stones is a type of stone you have. You want to know how many of the stones you have are also jewels.

Letters are case sensitive, so "a" is considered a different type of stone from "A".

Example 1:
Input: jewels = "aA", stones = "aAAbbbb"
Output: 3
*/

var numJewelsInStones = function (jewels, stones) {
  let jewelsMap = new Map(),
    count = 0;

  for (const jewel of jewels) {
    jewelsMap.set(jewel, 1);
  }

  for (const stone of stones) {
    if (jewelsMap.has(stone)) count++;
  }

  return count;
};

console.log(numJewelsInStones('aA', 'aAAbbbb'));
