const InOrderTreeTrav = (root) => {
  const nodes = [];
  if (!root) return;

  InOrderTreeTrav(root.left);
  nodes.push(root.val);
  InOrderTreeTrav(root.rigth);

  return nodes;
};

// Definition of BST node
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// Build a tree by traversing over another tree
const inOrderTreeBuild = (root, bstArgs) => {
  const resBST = bstArgs || new TreeNode(0);
  if (!root) return;

  resBST.val = root.val;
  if (root.left) resBST.left = inOrderTreeBuild(root.left, resBST['left']);
  if (root.right) resBST.right = inOrderTreeBuild(root.right, resBST['right']);

  return resBST;
};

/* You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.
 */
var searchBST = function (root, val) {
  if (!root) return null;

  // Just return the root (will contain all the root's branches)
  // No need to build a new tree from it
  if (root.val === val) return root;

  if (val > root.val) return searchBST(root.right, val);
  if (val < root.val) return searchBST(root.left, val);
};

var searchBST = function (root, val) {
  while (root) {
    if (val === root.val) return root;

    if (val < root.val) {
      root = root.left;
    } else {
      root = root.right;
    }
  }
};

let tree = {
  val: 8,
  left: {
    val: 3,
    left: { val: 1 },
    right: { val: 6, left: { val: 4 }, right: { val: 7 } },
  },
  right: { val: 10, right: { val: 14, left: { val: 13 } } },
};
// console.log(searchBST(tree, 63));

// const newTree = inOrderTreeBuild(tree);
// console.log({ newTree });

// Pascal's Triangle
//
const getElt = (rowIndx, colIndx, memo) => {
  let position = rowIndx + ',' + colIndx;

  if (memo[position]) {
    return memo[position];
  }

  if (colIndx === 0 || colIndx === rowIndx) {
    memo[position] = 1;
    return memo[position];
  }

  if (colIndx === 1 || colIndx === rowIndx - 1) {
    memo[position] = rowIndx;
    return memo[position];
  }

  memo[position] =
    getElt(rowIndx - 1, colIndx - 1, memo) + getElt(rowIndx - 1, colIndx, memo);

  return memo[position];
};

var getRowMy = function (rowIndex) {
  let memo = {};
  if (rowIndex === 0) return [1];

  if (rowIndex === 1) return [1, 1];

  let row = new Array(rowIndex + 1).fill(0);

  for (let i = 0; i <= row.length - 1; i++) {
    if (i === 0 || i === row.length - 1) {
      row[i] = 1;
    } else if (i === 1 || i === row.length - 2) {
      row[i] = rowIndex;
    } else {
      memo[(rowIndex, i)] =
        getElt(rowIndex - 1, i - 1, memo) + getElt(rowIndex - 1, i, memo);

      row[i] = memo[(rowIndex, i)];
    }
  }
  return row;
};

var getRow = function (rowIndex) {
  if (rowIndex === 0) {
    return [1];
  }
  if (rowIndex === 1) {
    return [1, 1];
  }

  let prev = [1, 1];

  for (let i = 2; i <= rowIndex; i++) {
    const newPrev = [1];
    for (let j = 0; j < prev.length - 1; j++) {
      newPrev.push(prev[j] + prev[j + 1]);
    }
    newPrev.push(1);

    if (i === rowIndex) {
      return newPrev;
    }

    prev = newPrev;
  }
};
// console.log(getRow(6));

// FInd BST MAx depth
// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

/* ///////////////////////////////////////////////// TAIL RECURSION
var maxDepth = function (root, acc = 0) {
  if (root === null) return acc;

  return Math.max(maxDepth(root.left, acc + 1), maxDepth(root.right, acc + 1));
}; */

//////////////////////////////The same as above but NO TAIL RECURSION
/* var maxDepth = function (root, total = 0) {
  if (root === null) {
    return total;
  }

  total++;
  total = Math.max(maxDepth(root.left, total), maxDepth(root.right, total));
  return total;
};
 */
var maxDepth = function (root) {
  let acc = 0;
  while (root) {
    acc++;
    root = root.left ?? root.right;
  }

  return acc;
};
/* 
Given an integer n, return all the structurally unique BST's (binary search trees), which has exactly n nodes of unique values from 1 to n. Return the answer in any order. */

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
//// Mine. Working but impossible to debug
// therefore not acceptable
/* var generateTrees = function (n, prevTree = {}, k = 1) {
  let localTree;
  let currentKthRes = [];

  if (k === 1) {
    currentKthRes.push(new TreeNode(1));
  }

  if (k > 1) {
    let pointer;
    prevTree.forEach((tree) => {
      localTree = JSON.stringify(tree);

      let localCopy = JSON.parse(localTree);
      let i = 1;
      while (localCopy.right) {
        let copy = JSON.parse(localTree);
        pointer = copy;

        for (let j = 2; j <= i; j++) {
          pointer = pointer.right;
        }
        pointer.right = new TreeNode(k, pointer.right);
        currentKthRes.push(copy);

        i++;
        localCopy = localCopy.right;
      }

      localCopy = JSON.parse(localTree);
      let newTree = new TreeNode(k, localCopy);
      currentKthRes.push(newTree);

      localCopy = JSON.parse(localTree);
      if (k <= 2) {
        pointer = localCopy.right;
        localCopy.right = new TreeNode(k, pointer);
      } else {
        pointer = localCopy;
        while (pointer.right) {
          pointer = pointer.right;
        }
        pointer.right = new TreeNode(k);
      }
      currentKthRes.push(localCopy);
    });
  }

  if (k === n) return currentKthRes;

  return generateTrees(n, currentKthRes, k + 1);
};
 */

const recur = (start, end) => {
  let res = [];

  if (start > end) return [null];

  for (let i = start; i <= end; i++) {
    let left = recur(start, i - 1);
    let right = recur(i + 1, end);

    for (let l of left) {
      for (let r of right) {
        let newTree = new TreeNode(i, l, r);

        res.push(newTree);
      }
    }
  }
  return res;
};

var generateTrees = function (n) {
  if (n === 0) return null;

  return recur(1, n);
};

console.log(generateTrees(3));
