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
