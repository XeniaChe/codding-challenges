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
/* const buildArr = (list, arrArg = []) => {
  const arr = arrArg;

  if (list.next === null) {
    arr.push(list.val);
    return arr;
  }

  if (list.next) buildArr(list.next, arr);

  arr.push(list.val);
  // !!! returns REVERSED arr
  return arr || [];
}; */

//////////////////////////////////The same as above
const buildArr = (list) => {
  const arr = [];

  while (list) {
    arr.push(list.val);

    list = list.next;
  }

  return arr;
};
// console.log(buildArr(l1));
function createNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/* const buildListOut = (arr, listArgs = {}) => {
  let list = listArgs;
  const lastInx = arr.length - 1;

  if (lastInx === 0) {
    list['val'] = arr[0];
    list['next'] = null;

    return list;
  }

  list = buildListOut(arr.slice(1), list);

  list['next'] = { ...list };
  list['val'] = arr[0];

  return list;
}; */

////////////////////////////////////////////////////The same as above applying TAIL recursion
/* const buildListOut = (arr, listArgs = {}) => {
  let list = listArgs || new createNode(0);
  let pointer = list;

  while (pointer.next) {
    pointer = pointer.next;
  }

  if (arr.length === 1) {
    pointer.val = arr[0];

    return list;
  }

  pointer.val = arr[0];
  pointer.next = new createNode(0);

  return buildListOut(arr.slice(1), list);
}; */

const buildListOut = (arr) => {
  const list = new createNode(0);
  let pointer = list;

  while (arr.length > 1) {
    pointer.val = arr[0];
    pointer.next = new createNode(0);
    pointer = pointer.next;

    arr = arr.slice(1);
  }

  return list;
};

const arr = [8, 3, 4, 2];
// console.log(buildListOut(arr));

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

// Numbers in lists are in reversed order
// Returns the result as fom nums in NOT reversed order
// eg: 2->4->3 + 5->6->4 = 7->0->8 (explanation 243+ 564 -> 342+465(real numbers to calc.) = 807(real NOt reversed result))
const addTwoNumbers3 = (l1, l2, leaf = null, carry = 0) => {
  let resList = null;
  let val;

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
  val: 1,
  next: { val: 3, next: { val: 5, next: null } },
};

l2 = {
  val: 1,
  next: { val: 2, next: { val: 4, next: null } },
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

// console.log(swapPairs(listToSwap));

// Given the head of a singly linked list, reverse the list, and return the reversed list.
/* var reverseList = function (head, leafArgs) {
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
}; */

////////////////////////////////////////////////////The same as above applying TAIL recursion
/* var reverseList = function (head, list) {

  list = list ? new createNode(head.val, list) : new createNode(head.val);

  if (!head.next) return list;

  return reverseList(head.next, list);
}; */

var reverseList = function (head) {
  let list = new createNode(head.val);
  head = head.next;

  while (head) {
    list = new createNode(head.val, list);
    head = head.next;
  }

  return list;
};

// console.log(reverseList(l2));

/* 
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list. */
// Worked but too heavy
/* var mergeTwoLists = function (list1, list2, resListArg) {
  let resList = resListArg || new createNode(0);

  if (!list1 && !list2) return resList;

  if (!list1) {
    resList.val = list2.val;
    resList.next = list2.next;

    return resList;
  }

  if (!list2) {
    resList.val = list1.val;
    resList.next = list1.next;

    return resList;
  }

  if (list1.val >= list2.val) {
    resList.val = list2.val;
    resList.next = new createNode(0);
    mergeTwoLists(list1, list2.next, resList.next);
  } else {
    resList.val = list1.val;
    resList.next = new createNode(0);

    mergeTwoLists(list1.next, list2, resList.next);
  }

  return resList;
}; */

// Lower space and time complexity
// Interesting pattern
var mergeTwoLists = function (list1, list2) {
  let resList = new createNode(0);
  let pointer = resList;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      pointer.next = list1;

      list1 = list1.next;
    } else {
      pointer.next = list2;

      list2 = list2.next;
    }

    pointer = pointer.next;
  }

  if (!list1) pointer.next = list2;
  if (!list2) pointer.next = list1;

  return resList.next;
};
console.log(mergeTwoLists(l1, l2));

// Pattern explanation
const buildChain = (num) => {
  let a = { a: 'aaa' };
  let b = a;

  while (num > 0) {
    b.next = { round: num };

    num--;
    b = b.next;
  }

  return a;
};

// console.log(buildChain(3));
