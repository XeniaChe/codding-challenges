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
// const arrToL1 = [
//   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 1,
// ];
// const arrToL2 = [5, 6, 4];

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

// console.log(addTwoNumbers(l1, l2));

function createNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// Numbers in lists are in reversed order
// Returns the result as fom nums in NOT reversed order
// eg: 2->4->3 + 5->6->4 = 7->0->8 (explanation 243+ 564 -> 342+465(real numbers to calc.) = 807(real NOt reversed result))
const addTwoNumbers3 = (l1, l2, leaf = null, carry = 0) => {
  let resList = /* resListArg || new createNode(0) */ null;
  let val; /* , leaf; */
  // let carry

  if (l1.next === null && l2.next === null) {
    val = (+l1.val || 0) + (+l2.val || 0) + carry;
    resList = new createNode(val, leaf);
    return resList;
  }

  val = (+l1.val || 0) + (+l2.val || 0) + carry;
  if (val > 9) {
    carry = 1;
    val %= 10;
  }

  leaf = new createNode(val, leaf);
  let nextL1 = l1.next ?? new createNode(0);
  let nextL2 = l2.next ?? new createNode(0);
  resList = addTwoNumbers3(nextL1, nextL2, leaf, carry);

  return resList;
};

// Numbers in lists are in reversed order
// Returns the result ALSO in reversed order
// eg: 2->4->3 + 5->6->4 = 7->0->8 (explanation 243+ 564 -> 342+465(real numbers to calc.) = 807->708 (reversed result))
const addTwoNumbers2 = (l1, l2, carry = 0) => {
  let resList = null;
  let val;
  if ((l1.next === null) & (l2.next === null)) {
    val = +l1.val + +l2.val + carry;
    if (val > 9) {
      val %= 10;
      carry = 1;
      resList = new createNode(val);
      resList.next = new createNode(carry);

      return resList;
    }

    resList = new createNode(val);

    return resList;
  }

  val = +l1.val + +l2.val + carry;
  carry = 0;
  if (val > 9) {
    val %= 10;
    carry = 1;
  }
  resList = new createNode(val);

  let nextL1 = l1.next ?? new createNode(0);
  let nextL2 = l2.next ?? new createNode(0);
  resList.next = addTwoNumbers2(nextL1, nextL2, carry);

  return resList;
};

l1 = {
  val: 8,
  next: { val: 3, next: { val: 2, next: null } },
};

l2 = {
  val: 9,
  next: { val: 2, next: { val: 1, next: null } },
};
// console.log(addTwoNumbers3(l1, l2)); // reversed result
// console.log(addTwoNumbers2(l1, l2)); // NOT reversed result

// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the val in the list's nodes (i.e., only nodes themselves may be changed.)

var swapPairs = function (head) {
  if (head === null) return head;

  let resList = new createNode();

  if (head.next === null) {
    return head;
  }

  if (head.next.next === null) {
    resList.val = head.next.val;
    resList.next = new createNode(head.val);

    return resList;
  }

  // Swap first 2 nodes
  resList.val = head.next.val;
  resList.next = new createNode(head.val);

  // recursive call. Assisgn res to the step 1 next val  }

  resList.next.next = swapPairs(head.next.next);

  return resList;
};
const listToSwap = buildListOut([1, 2, 3]);
// console.log(swapPairs(listToSwap));

// Given the head of a singly linked list, reverse the list, and return the reversed list.
var reverseList = function (head, leafArgs) {
  let leaf = leafArgs || null;
  let resList = new createNode(0);

  if (head === null) return head;

  if (head.next === null) {
    resList.val = head.val;
    resList.next = leaf;

    return resList;
  }

  resList.val = head.val;
  resList.next = leaf;

  resList = reverseList(head.next, resList);
  return resList;
};

console.log(reverseList(listToSwap));
