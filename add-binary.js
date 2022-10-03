/*
Easy
Given two binary strings a and b, return their sum as a binary string.
Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101" */
var addBinary = function (a, b) {
  const sumArr = [];
  // COnvert strings to arr-s
  const arrA = a.split('');
  const arrB = b.split('');

  // Defie longest
  let longest = arrA;
  let short = arrB;

  if (arrA.length < arrB.length) {
    longest = arrB;
    short = arrA;
  }
  // Loop over longest && calc sum for each loop round
  let carry = 0;
  for (let i = longest.length - 1; i >= 0; i--) {
    const shortIndx = i - (longest.length - short.length);

    let sum = shortIndx < 0 ? +longest[i] : +longest[i] + +short[shortIndx];

    if (sum > 1) {
      sum = 0;
      if (carry) {
        sum = sum += carry > 1 ? carry : (sum += carry);
      }
      carry = 1;
    } else {
      if (carry) {
        if (sum + carry > 1) {
          sum = 0;
          carry = 1;
        } else {
          sum += carry;
          carry = 0;
        }
      }
    }

    sumArr.push(sum);
    if (i === 0 && carry) sumArr.push(carry);
  }

  // Convert reversed summArr to string
  const sumStr = sumArr.reverse().join('');

  return sumStr;
};

let a, b;
// a = '11';
// b = '1';
a = '1010';
b = '111';
// a = '1';
// b = '11';
// a = '110010';
// b = '10111';

console.log(addBinary(a, b));
