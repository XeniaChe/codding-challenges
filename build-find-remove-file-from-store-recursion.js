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

const buildStore = (pathArr, fileSize, store) => {
  const localStore = store;
  const fileName = pathArr[pathArr.length - 1];
  if (pathArr.length === 1) {
    localStore[fileName] = {
      name: fileName,
      size: fileSize,
    };

    return 'created';
  }

  localStore[pathArr[0]] ??= {};
  const nextPath = pathArr.slice(1);

  buildStore(nextPath, fileSize, localStore[pathArr[0]]);
};

const findFile = (pathFrom, store, file = {}) => {
  const fileNameFrom = pathFrom[pathFrom.length - 1];

  if (pathFrom.length === 1) {
    if (store[fileNameFrom]) {
      file = { ...store[fileNameFrom] };

      delete store[fileNameFrom];

      return file;
    }

    return 'not found';
  }

  const nextPath = pathFrom.slice(1);

  file = findFile(nextPath, store[pathFrom[0]], file);

  return file;
};

const moveFile = (file, pathTo, store) => {
  const fileNameTo = pathTo[pathTo.length - 1];

  if (pathTo.length === 1) {
    store[fileNameTo] = { ...file };

    return 'moved';
  }

  store[pathTo[0]] ??= {};
  const nextPath = pathTo.slice(1);

  moveFile(file, nextPath, store[pathTo[0]]);
};

let path1 = buildPAth('/a/b/fileA.txt');
let path2 = buildPAth('/a/fileB.txt');

// build store
buildStore(path1, '4', store);
console.log({ store });

// Find file REMOVE from old location
const file = findFile(path1, store);
// move to a new location
moveFile(file, path2, store);
console.log({ store });
