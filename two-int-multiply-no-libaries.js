const buildArr2 = (numStr) => {
  return numStr.split('');
};

var multiply = function (num1, num2) {
  const resArr = [];
  // Convert nums to arr and reverse
  const arr1 = buildArr2(num1);
  const arr2 = buildArr2(num2);

  let long = arr2;
  let short = arr1;
  if (arr1.length > arr2.length) {
    long = arr1;
    short = arr2;
  }
  let carry = 0;
  // Loop over longest
  for (let i = 0; i < long.length; i++) {
    // calc sum of each loop pair and
    let localSum = +long[i] + +short[i] || 0;
    if (carry) {
      localSum += carry;
      carry = 0;
    }

    if (localSum >= 10) {
      carry = 1;
      localSum -= 10;
    }

    // ... and assign carry if exists
    // push localSum to resArr
    resArr.push(localSum);
  }

  // reverse resArr
  const res = resArr.reverse().join('');
  return res;
};

let num1, num2;
num1 = '2';
num2 = '3';
console.log(multiply(num1, num2));

let a, b;
a = '123';
b = '100';
// a = '111';
// b = '102';
// a = '5';
// b = '5';
// a = '330';
// b = '2';
// a = '123';
// b = '456';
// a = '9';
// b = '99';
// a = '999';
// b = '999';
a = '888';
b = '10';

var multiply2 = function (num1, num2) {
  return String(BigInt(num1) * BigInt(num2));
};

var multiply3 = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';

  const m = num1.length,
    n = num2.length,
    res = new Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const p1 = i + j,
        p2 = i + j + 1;
      let sum = res[p2] + Number(num1[i]) * Number(num2[j]);
      res[p2] = sum % 10;
      res[p1] += Math.floor(sum / 10);
    }
  }
  if (res[0] === 0) res.shift();
  return res.join('');
};
// console.log(multiply3(a, b));
