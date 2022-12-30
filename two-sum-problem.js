/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const findAddendBinary = (arr, targetAddend, start, end) => {
  // Find midElIndex
  let mid = ~~((end - start) / 2 + start);
  // Check cases
  switch (true) {
    case targetAddend === arr[start]:
      return start;
    case targetAddend === arr[end]:
      return end;
    case targetAddend === arr[mid]:
      return mid;
    case targetAddend < arr[mid]:
      return findAddendBinary(
        arr,
        targetAddend,
        (start = start + 1),
        (end = mid - 1)
      );
    case targetAddend > arr[mid]:
      return findAddendBinary(
        arr,
        targetAddend,
        (start = mid + 1),
        (end = end - 1)
      );
    default:
      return false;
  }

  // Return index of the targetAddend
};
var twoSum = function (nums, target) {
  let arrRes = [];
  let addendIndx;
  // Sort initial arr
  const arrSorted = nums.sort((a, b) => a - b);
  // Loop over each el-t and return it's addend or false
  arrSorted.forEach((el, index) => {
    // Call  findAddendBinary() with startIndex= 0 , endIndex=arr.length-1
    // and targetAddend=target - el
    const targetAddend = target - el;
    addendIndx = findAddendBinary(
      arrSorted,
      targetAddend,
      (start = 0),
      (end = arrSorted.length - 1)
    );

    // Push el-t's index and it's addend into arrRes
    if (addendIndx && !arrRes.includes(index)) arrRes.push(index, addendIndx);
  });
  return arrRes;
};

/* Using Hashing */
/* Given an array of integers nums and an integer target, return indices of two numbers such that they add  up to target. You cannot use the same index twice.
 */

/* We can build a hash map as we iterate along the array, mapping each value to it's index. At each index i, where num = nums[i], we can check our hash map for target - num. Adding key-value pairs and checking for   target - num are all O(1), so our time complexity will improve to O(n).
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

console.log(twoSum([1, 3, 4, 5, 7], 10));
