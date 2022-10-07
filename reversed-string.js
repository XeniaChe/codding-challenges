// Using recursion BUT
// does NOT modifying the input
// according the task requirements it should
var reverseString = function (s) {
  let next = [];
  if (s.length === 2) {
    next.push(s[1], s[0]);
    return next;
  }

  next = reverseString(s.slice(1));
  next.push(s[0]);
  s = [...next];

  return s;
};

// Mutating the input SECOND better solution
var reverseString = function (s) {
  let firstIndx = 0;
  let lastIndx = s.length - 1;
  const midIndx = Math.trunc(lastIndx / 2);

  while (firstIndx <= midIndx) {
    let memo = s[firstIndx];
    s[firstIndx] = s[lastIndx];
    s[lastIndx] = memo;

    firstIndx++;
    lastIndx--;
  }
  return s;
};

// Mutating the input SECOND better solution
var reverseString = function (s) {
  let lastIndx = s.length - 1;
  let firstIndx = 0;

  while (lastIndx !== 0) {
    s.push(s[lastIndx - 1]);
    s.splice(lastIndx - 1, 1);
    firstIndx++;
    lastIndx--;
  }
};

// const res = reverseString(['H', 'a', 'n', 'n', 'a', 'h']);
const res = reverseString(['h', 'e', 'l', 'o']);
console.log(res);
