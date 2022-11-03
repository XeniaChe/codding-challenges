/* 
// Recursion basic
const getNum = (num, resNum = 0) => {
  if (num === 1) {
    resNum = 100;
    return resNum;
  }

  resNum = getNum(num - 1, resNum);

  return resNum;
};

const resNum = getNum(5);
console.log({ resNum }); */

const store = {};
const buildPAth = (str) => {
  return str.split('/').slice(1);
};

const buildStore = (pathArr, fileSize, store = {}) => {
  let pointer = store;
  while (pathArr.length > 1) {
    pointer[pathArr[0]] ??= {};

    pointer = pointer[pathArr[0]];
    pathArr = pathArr.slice(1);
  }

  let fileName = pathArr[0];
  pointer[fileName] = { name: fileName, size: fileSize };

  let msg = pointer[fileName].name ? 'created' : 'error';
  return msg;
};

const findFile = (pathFrom, store) => {
  let pointer = store;
  while (pathFrom.length > 1) {
    pointer = pointer[pathFrom[0]];

    if (!pointer) throw new Error('Wrong path');

    pathFrom = pathFrom.slice(1);
  }

  const fileName = pathFrom[0];
  const file = { ...pointer[fileName] };
  delete pointer[fileName];

  return file.name ? file : 'not found';
};

const moveFile = (pathFrom, pathTo, store) => {
  // Find  and remove file from init location
  const file = findFile(pathFrom, store);
  if (!file.name) throw new Error('File does not exists');

  // Move to  a new one
  buildStore(pathTo, file.size, store);
};

let path1 = buildPAth('/a/b/fileA.txt');
let path2 = buildPAth('/a/fileB.txt');

// build store
buildStore(path1, '4', store);
console.log({ store });

// Find file REMOVE from old location
// move to a new location
moveFile(path1, path2, store);
console.log({ store });
// Check
const newFile = findFile(path2, store);
console.log({ newFile });
