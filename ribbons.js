/* 
You are given an array of integers a, where each element a[i] represents the length of a ribbon.

Your goal is to obtain k ribbons of the same length, by cutting the ribbons into as many pieces as you want.

Your task is to calculate the maximum integer length L for which it is possible to obtain at least k ribbons of length L by cutting the given ones.

For a = [5, 2, 7, 4, 9] and k = 5, the output should be solution(a, k) = 4.
For a = [1, 2, 3, 4, 9] and k = 6, the output should be solution(a, k) = 2.

Here's a way to achieve 5 ribbons of length 4:

Cut the ribbon of length 5 into one ribbon of length 1 (which can be discarded) and one ribbon of length 4.
Cut the ribbon of length 7 into one ribbon of length 3 (which can be discarded) and one ribbon of length 4.
Use the existing ribbon of length 4 (no need to cut it)
Cut the ribbon of length 9 into two ribbons of length 4 (and one of length 1 which can be discarded)
Discard the ribbon of length 2

And since it wouldn't be possible to make 5 ribbons of any greater length, the answer is 4. */

const getQuantity = (arr, endInx) => {
  const localArr = arr.slice(0, endInx + 1);
  let quantity = 0;

  localArr.forEach((el, _, arr) => {
    quantity += Math.floor(el / arr[endInx]);
  });

  return quantity;
};

function solutionRibbons(a, k) {
  // Sort the arr desc
  const sortedArr = [...a].sort((b, c) => c - b);
  let resLength = null;

  for (let i = 0; i < sortedArr.length; i++) {
    let totalQuant = 0;
    const localQuant = getQuantity(sortedArr, i);

    totalQuant += localQuant;

    if (totalQuant === k) resLength = sortedArr[i];
  }

  return resLength;
}

// Second solution
var solutionRibbons = function (a, k) {
  // Sort the arr in ascending order
  a = a.sort((a, b) => a - b);
  const lastEl = a.length - 1;

  if (k === 1) return a[lastEl];

  for (let i = lastEl - 1; i >= 0; i--) {
    let res = 1;

    for (let j = lastEl; j > i; j--) {
      res += Math.floor(a[j] / a[i]);
    }

    if (res >= k) return a[i];
  }
};

console.log(solutionRibbons([5, 2, 7, 4, 9], 5));
console.log(solutionRibbons([1, 2, 3, 4, 9], 6));
