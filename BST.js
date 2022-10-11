const InOrderTreeTrav = (root) => {
  const nodes = [];
  if (!root) return;

  InOrderTreeTrav(root.left);
  nodes.push(root.val);
  InOrderTreeTrav(root.rigth);

  return nodes;
};

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

// You are given the root of a binary search tree (BST) and an integer val.

// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.
var searchBST = function (root, val) {
  if (!root) return null;

  // Just return the root (will contain all the root's branches)
  // No need to build a new tree from it
  if (root.val === val) return root;

  if (val > root.val) return searchBST(root.right, val);
  if (val < root.val) return searchBST(root.left, val);
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

tree = {
  val: 18,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: {
    val: 22,
    left: null,
    right: { val: 63, left: null, right: { val: 84, left: null, right: null } },
  },
};
const newTree = inOrderTreeBuild(tree);
// console.log({ newTree });
// console.log(searchBST(tree, 63));

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

var getRow = function (rowIndex) {
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

console.log(getRow(4));
