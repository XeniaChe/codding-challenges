const input = { root: 1, a_b_c: 3, a_d: 2 };

const solution = (input) => {
  const res = {};

  // create keys arr
  const keys = Object.keys(input);

  // loop over keys && split on '_'
  for (let i = 0; i < keys.length; i++) {
    const keyArr = keys[i].split('_');

    if (keyArr.length > 1) {
      // nesting functionality
      let pointer = res;

      let j = 0;
      while (j < keyArr.length) {
        if (j === keyArr.length - 1) {
          pointer[keyArr[j]] = input[keys[i]];
        } else {
          pointer[keyArr[j]] ||= {};

          pointer = pointer[keyArr[j]];
        }
        j++;
      }
    } else {
      res[keyArr[0]] = input[keyArr[0]];
    }
  }

  return res;
};

// console.log('sol' + JSON.stringify(solution(input)));

const solution2 = (input) => {
  const res = {},
    keys = Object.keys(input);

  keys.reduce((acc, key) => {
    const keysArr = key.split('_');

    if (keysArr.length > 1) {
      //nest
      let pointer = res;
      let i = 0;
      while (i < keysArr.length) {
        if (i === keysArr.length - 1) {
          pointer[keysArr[i]] = input[key];
        } else {
          pointer[keysArr[i]] ||= {};

          pointer = pointer[keysArr[i]];
        }
        i++;
      }
    } else {
      acc[keysArr[0]] = input[keysArr[0]];
    }
  }, res);

  return res;
};
// console.log('sol2' + JSON.stringify(solution2(input)));

const banknotes = [
  {
    1: 10,
  },
  {
    2: 2,
  },
  {
    5: 5,
  },
  {
    10: 2,
  },
  {
    20: 1,
  },
  {
    50: 5,
  },
  {
    100: 10,
  },
  {
    200: 1,
  },
];

const call = (num, banknotes) => {
  const res = {};
  let curNum = num;

  for (let i = banknotes.length - 1; i >= 0; i--) {
    const bill = +Object.keys(banknotes[i])[0];

    if (bill <= curNum) {
      let billCount = banknotes[i][bill],
        usedCount = 0;

      while (curNum >= bill && billCount > 0) {
        curNum -= bill;
        billCount--;
        usedCount++;
      }

      res[bill] = usedCount;
    }
  }

  return res;
};

// const res = call(25, banknotes);
// console.log({ res });

// const distortion = { distortion: 1 };
// const volume = { volume: 1 };
const cabinet = { cabinet: 'maplgsgstge' };
const lowCut = { lowCut: 1 };
const inputLevel = { inputLevel: 1 };

const GuitarAmp = (options) => {
  return Object.assign({}, /* distortion, volume, cabinet, */ options);
};

const BassAmp = (options) => {
  return Object.assign({}, lowCut, volume, cabinet, options);
};

const ChannelStrip = (options) => {
  return Object.assign({}, /* inputLevel, lowCut, volume, */ cabinet, options);
};

const level = 2;

const actual = GuitarAmp({
  distortion: level,
  volume: level,
  cabinet,
});
const actual2 = ChannelStrip({
  inputLevel: level,
  lowCut: level,
  volume: level,
});
// console.log({ actual2 });
/* test('GuitarAmp', (assert) => {
  const msg = 'should have distortion, volume, and cabinet';
  const level = 2;
  const cabinet = 'vintage';

  const actual = GuitarAmp({
    distortion: level,
    volume: level,
    cabinet,
  });
  const expected = {
    distortion: level,
    volume: level,
    cabinet,
  };

  assert.deepEqual(actual, expected, msg);
  assert.end();
});

 */

/* test('ChannelStrip', (assert) => {
  const msg = 'should have inputLevel, lowCut, and volume';
  const level = 2;

  const actual = ChannelStrip({
    inputLevel: level,
    lowCut: level,
    volume: level,
  });
  const expected = {
    inputLevel: level,
    lowCut: level,
    volume: level,
  };

  assert.deepEqual(actual, expected, msg);
  assert.end();
});
 */

const f = () => {
  let count = 0;

  setInterval(() => {}, 1000);
};

const a = () => {
  // heavy operation

  Date.now();
};

const b = (func) => {
  const time = Date.now();

  func();
  console.log(Date.now() - time);
};

const arr = ['a', 's', 'b', null, 't ', null];

const moveNull2 = (arr) => {
  const arr2 = new Array(arr.length).fill(null);

  let pointer = null;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      if (pointer) {
        arr2[pointer] = arr[i];
        pointer = i;
      } else {
        arr2[i] = arr[i];
      }
    } else {
      pointer = i;
    }
  }
  return arr2;
};

// console.log(moveNull2(arr));
const moveNull = (arr) => {
  const arr2 = new Array(arr.length).fill(null);

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] !== null) {
      arr2[i] = arr[i];
    } else {
      const memo = arr[i];
      let j = i;

      while (arr[j] === null && j < arr.length) {
        j++;
      }
      arr2[i] = arr[j];

      arr[j] = memo;
    }
  }

  return arr2;
};

const findWinners = (matches) => {
  const players = new Set(),
    loosers = new Map(),
    notLost = [],
    lostOne = [];

  for (const [win, loos] of matches) {
    players.add(win);
    players.add(loos);

    loosers.set(loos, (loosers.get(loos) || 0) + 1);
  }

  for (const player of players) {
    if (!loosers.get(player)) notLost.push(player);

    if (loosers.get(player) === 1) lostOne.push(player);
  }

  notLost.sort((a, b) => a - b);
  lostOne.sort((a, b) => a - b);

  return [notLost, lostOne];
};

const maxNumberOfBalloons = (text) => {
  const counts = new Map(),
    target = 'balloon',
    baloonsCount = new Set();

  for (let i = 0; i < text.length; i++) {
    counts.set(text[i], (counts.get(text[i]) || 0) + 1);
  }

  for (let i = 0; i < target.length; i++) {
    if (!counts.get(target[i])) return 0;

    let frequency =
      target[i] === 'l' || target[i] === 'o'
        ? Math.trunc(counts.get(target[i] || 0) / 2)
        : counts.get(target[i]) || 0;

    baloonsCount.add(frequency);
  }

  return Math.min(...baloonsCount);
};
let str = 'balonbalon';
// console.log(maxNumberOfBalloons(str));

const print = () => {
  for (let z = 0; z <= 500 / 50; z++) {
    for (let y = 0; y <= (500 - z * 50) / 10; y++) {
      let x = 500 - 50 * z - 10 * y;
      console.log(y, x);
      checkUnits(x, y, z);
    }
  }
};

const print2 = () => {
  let x,
    y,
    z = 0;

  while (x + y + z <= 100) {
    x++;

    y = x + 1;
    z = y + 1;
  }

  return x, y, z;
};

const checkUnits = (x, y, z, total = 500) => {
  // check x +y+z =100

  // xSal + ySal +zSal = 500

  // xSal = x * 1;
  // ySal = y * 10;
  // zSal = z * 50;
  const check2 = x + y * 10 + z * 50;
  const check = x + y + z;

  if (check === 100 && check2 === total) return true;

  return fasle;
};

////////////////////////////////////////////////

const closure = () => {
  const arr1 = [],
    arr2 = [];

  for (var i = 0; i < 4; i++) {
    arr1.push(() => console.log(i));
  }

  for (let i = 0; i < 4; i++) {
    arr2.push(() => console.log(i));
  }

  for (let i = 0; i < 4; i++) {
    arr1[i](); // res: 4 4 4 4
  }

  for (let i = 0; i < 4; i++) {
    arr2[i](); // res: 0 1 2 3
  }
};
// closure();

let autoIncrement = (function () {
  let number = 0;

  return function () {
    number++;
    return number;
  };
})();

// console.log(autoIncrement()); //1 !!!!!!!!!!!!!!!!
// console.log(autoIncrement()); //2
// console.log(autoIncrement()); //3
// console.log(autoIncrement()); //4
////////////////////////////////////////////////

/* 
  const obj = {
    name: 'test',
    prop: {
      // name: "prop name",
      print: function () {
        console.log('print0: ' + this.name);
      },
    },
    print: function () {
      console.log('print: ' + this.name);
    },
    print2: () => console.log('print2: ' + this.name, this),
  };

  obj.print(); //ans: test
  obj.prop.print(); //ans: undefined
  obj.print2(); //ans: undefined

  const obj2 = {
    name: 'test',
    // prop: {
    //   print: () => console.log('print0: ' + this.name),
    // },
    print: function () {
      console.log('print: ' + this.name);
    },
    print2: () => console.log('print2: ' + this.name, this),
  };

  obj2.print(); //ans: test
  // obj2.prop.print(); //ans: prop name
 */

const task1 = (A) => {
  // Implement your solution here
  let min = A[0],
    res = min < 0 ? 1 : min + 1;
  A.sort();

  for (let i = 1; i < A.length; i++) {
    if (A[i] == res) res = res + 1;

    if (A[i] < min) {
      min = A[i];

      res = min < 0 ? 1 : min + 1;
    }
  }

  console.log({ res });
  return res;
};
// task1([1, 3, 6, 4, 1, 2]);
// task1([-2, -3]);
// task1([3, 2, 1]);

/* Generate random password that has len to less than 3 and contains min 1 Upper case, 1 digit, 1 special Char */

const _ = require('lodash');

function getRandomChar(charSet) {
  const randomIndex = Math.floor(Math.random() * charSet.length);
  return charSet[randomIndex];
}

function passwordGenerator(charsQuantity) {
  let pass = '';
  const validChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  console.log('Initial solution - passwordGenerator');

  if (typeof charsQuantity !== 'number' || !Number.isInteger(charsQuantity))
    return 'Not an Integer';
  if (charsQuantity < 3) return 'Minimum length allowed: 3';

  for (let i = 0; i <= charsQuantity - 1; i++) {
    pass += validChars.charAt(_.random(0, validChars.length - 1));
  }

  return pass;
}
// console.log(passwordGenerator({}));

function generatePassword2(length) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-=])[A-Za-z\d!@#$%^&*()_+~`|}{[\]:;?><,./-=]{length,}$/;
  const validChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';

  while (!regex.test(password)) {
    // generate random password until it matches the regex pattern
    password = '';
    for (let i = 0; i < length; i++) {
      password += validChars.charAt(
        Math.floor(Math.random() * validChars.length)
      );
    }
  }

  return password;
}

/* Write generator function that generates Fridays  */

// Pattern
function* evenNumbers() {
  let n = 0;
  while (true) {
    yield n;
    n += 2;
  }
}

const getNextFriday = (date) => {
  const fisrtFr = new Date(date);

  fisrtFr.setDate(fisrtFr.getDate() + 7);
  const year = fisrtFr.getFullYear().toString();
  const month = ('0' + (fisrtFr.getMonth() + 1)).slice(-2);
  const day = ('0' + fisrtFr.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

function* fridaysGenerator(date) {
  const startDate = date;
  let workDate = date,
    latestVal = date;

  while (true) {
    const resetDate = yield latestVal;

    if (resetDate === 'start') {
      workDate = startDate;

      latestVal = startDate;
    } else if (resetDate === 'end') {
      return latestVal;
    } else {
      workDate = getNextFriday(workDate);

      latestVal = workDate;
    }
  }
}
const fridayGen = fridaysGenerator('2023-06-15');

console.log(fridayGen.next().value);
console.log(fridayGen.next().value);
console.log(fridayGen.next('end').value);
console.log(fridayGen.next().value);
