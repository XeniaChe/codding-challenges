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

////// More or less the same time/space complexity as above
/// just more compact
var getSum = function (a, b) {
  let sum;

  let bigNum = Math.abs(a) >= Math.abs(b) ? a : b;
  let smallNum = Math.abs(a) >= Math.abs(b) ? b : a;

  sum = bigNum;

  while (smallNum) {
    if (smallNum > 0) {
      sum++;
      smallNum--;
    }

    if (smallNum < 0) {
      sum--;
      smallNum++;
    }
  }

  return sum;
};

var getSum = function (a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  if (x < y) return getSum(b, a);
  let sign = a > 0 ? 1 : -1;
  //add on sign at end

  if (a * b >= 0) {
    //sum of two positive integers x+y where x>y
    while (y) {
      let answer = x ^ y;
      //x xor y-->1xor0=1 0xor0=0 1xor1=0

      let carry = (x & y) << 1;
      //the carry is x&y shifted over to left by 1
      x = answer;
      y = carry;
      //eventually y will terminate--and you will be left with anwer
    }
  } else {
    //difference of two integers x-y where x>y
    while (y) {
      let answer = x ^ y;
      //answer is equal to xXORy
      let borrow = (~x & y) << 1;
      //borrow is equal to the negation of x AND y shifted over one bit to the left
      x = answer;
      y = borrow;
      //for next iteration--eventually y terminates when you get right answer
    }
  }
  return x * sign;
};

let a, b;
a = -1;
b = 0;
a = 2;
b = 3;
a = -12;
b = -8;
// a = -1;
// b = 1;
// a = 16;
// b = -14;

console.log(getSum(a, b));
