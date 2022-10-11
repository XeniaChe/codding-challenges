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
