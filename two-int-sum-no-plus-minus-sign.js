const buildArr = (num) => {
  const arr = [];
  if (num === 0) return arr;

  for (let i = 1; i <= Math.abs(num); i++) {
    // fill with '-' if <0
    // with '+' if >0
    let local = num < 0 ? '-' : '+';

    arr.push(local);
  }

  return arr;
};

var getSum = function (a, b) {
  // Build arrs from a, b
  const arrA = buildArr(a);
  const arrB = buildArr(b);
  // Find longest arr
  let long = arrA;
  let short = arrB;
  if (arrB.length > arrA.length) {
    long = arrB;
    short = arrA;
  }

  // Assume sum = longest arr length
  let sum = long.length;
  // Loop over longest and calc the sum
  for (let i = 0; i < long.length; i++) {
    // if (!short[i]) return sum;
    // If short[i] = '-' long[i] = '+' -> sum -=1
    // If short[i] = '-' long[i] = '-' -> sum +=1
    // If short[i] = '+' long[i] = '+' -> sum +=1
    if (
      (long[i] === '+' && short[i] === '+') ||
      (long[i] === '-' && short[i] === '-')
    )
      ++sum;
    if (
      ((long[i] === '+' && short[i] === '-') ||
        (short[i] === '+' && long[i] === '-')) &&
      short[i]
    )
      --sum;
  }
  // Define the res sum + or -:
  // if longest[0] === '-' -> res sum *= -1

  if (long[0] === '-' && sum !== 0) sum *= -1;

  return sum;
};

let a, b;
a = -1;
b = 0;
a = 2;
b = 3;
a = -12;
b = -8;
a = -1;
b = 1;
a = 16;
b = -14;

// console.log(getSum(a, b));

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
