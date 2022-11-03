// Get sum of number
const sumFromNum = (num) => {
  const arrOfEl = ('' + num).split('');
  let sum = null;

  arrOfEl.forEach((el) => {
    sum += +el;
  });

  return sum;
};

function solution(a) {
  let res = 0;

  // Get sum of every num in arr and put into arr
  const sumArr = a.map((el) => sumFromNum(el));

  // for each el of init arr check if its summ has a match
  // excluding itself
  a.forEach((num, i) => {
    const sumLocal = sumFromNum(num);
    const filteredOut = sumArr.slice(i + 1);

    if (!filteredOut.some((sum) => sum === sumLocal)) return;

    const matchIndx = filteredOut.indexOf(sumLocal);
    if (matchIndx >= 0) ++res;
  });

  return res;
}

let a = [25, 35, 872, 228, 53, 278, 872];
console.log(solution(a));
