let l1;
let l2;
l1 = {
  val: 2,
  next: { val: 4, next: { val: 3, next: { val: 8, next: null } } },
};

l2 = {
  val: 5,
  next: { val: 6, next: { val: 4, next: { val: 8, next: null } } },
};
// let l1 = {
//   val: 0,
// };
// let l2 = {
//   val: 0,
// };
const arrToL1 = [
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1,
];
const arrToL2 = [5, 6, 4];

// Build arr from list
const buildArr = (list, arrArg = []) => {
  const arr = arrArg;

  if (list.next === null) {
    arr.push(list.val);
    return arr;
  }

  if (list.next) buildArr(list.next, arr);

  arr.push(list.val);
  // !!! returns REVERSED arr
  return arr || [];
};

// console.log(buildArr(l1));

const buildListOut = (arr, listArgs = {}) => {
  let list = listArgs;
  const lastInx = arr.length - 1;

  if (lastInx === 0) {
    list['val'] = arr[0];
    list['next'] = null;

    return list;
  }

  /* list = */ buildListOut(arr.slice(1), list);

  list['next'] = { ...list };
  list['val'] = arr[0];

  return list;
};

// const arr = [8, 3, 4, 2];
// console.log(buildListOut2(arr));

// l1 = buildListOut(arrToL1);
// l2 = buildListOut(arrToL2);

const getSum = (long, short) => {
  let carry = 0;
  let sumArr = [];
  short.reverse();

  for (let i = long.length - 1; i >= 0; i--) {
    let localSum = 0;
    let shortIndx = long.length - 1 - i;

    localSum = long[i] + (short[shortIndx] || 0);
    if (carry) {
      localSum += carry;
      carry = 0;
    }

    if (localSum >= 10) {
      carry = Math.trunc(localSum / 10);
      localSum -= 10;
    }

    sumArr.push(localSum);
    if (i === 0 && carry) sumArr.push(carry);
  }

  return sumArr;
};

var addTwoNumbers = function (l1, l2) {
  let resList = {};
  // Transfrom list into arr
  let arr1 = buildArr(l1);
  let arr2 = buildArr(l2);

  let longest = arr2;
  let short = arr1;
  if (arr1.length > arr2.length) {
    longest = arr1;
    short = arr2;
  }

  // Loop over longest
  // Calc sum for every pair
  let sumArr = getSum(longest, short);

  // Get list from sumArr
  resList = buildListOut(sumArr);

  return resList;
};

console.log(addTwoNumbers(l1, l2));
