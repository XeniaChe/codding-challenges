///////////////////////////////////////////////// LEARNING
let tree = {
  val: 1,
  left: null,
  right: { val: 2 },
};

tree = {
  val: 3,
  left: {
    val: 9,
    left: null,
    right: null,
  },
  right: {
    val: 20,
    left: { val: 15, left: 10, right: null },
    right: { val: 7, left: null, right: null },
  },
};

//////////////////////////////////////////// TRAVERSAL
/////////////////////////////////////// Depth First Search (DFS)
let dfs = (node) => {
  if (!node) return;

  // Prioritazing the left node
  dfs(node.left);
  dfs(node.right);
};
// console.log(dfs(tree));

//////////////////////////*** Preorder traversal*/
dfs = (node) => {
  if (!node) return;

  console.log(node.val);

  dfs(node.left);
  dfs(node.right);
};

//////////////////////////*** Inorder traversal*/
dfs = (node) => {
  if (!node) return;

  dfs(node.left);
  console.log(node.val);
  dfs(node.right);
};

//////////////////////////*** Postorder traversal*/
dfs = (node) => {
  if (!node) return;

  dfs(node.left);
  dfs(node.right);
  console.log(node.val);
};

//////////////////////////***Itterative Implementstion*/
dfs = (root) => {
  let stack = [root];

  while (stack.length) {
    let node = stack.pop();
    console.log(node.val);

    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return;
};

tree = {
  val: 'root',
  left: {
    val: 'L1',
    left: { val: 'LL2' },
    right: { val: 'LR2' },
  },
  right: {
    val: 'R1',
    left: { val: 'LR2', left: null, right: null },
    right: { val: 'RR2', left: null, right: null },
  },
};

// console.log(dfs(tree)); // res: ['root', R1, RR2, LR2, L1, LR2, LL2];

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/* Example 1: 104. Maximum Depth of Binary Tree

Given the root of a binary tree, find the length of the longest path from the root to a leaf.
A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 */

var maxDepth = (root) => {
  if (!root) return 0;

  let left = maxDepth(root.left);
  let right = maxDepth(root.right);

  return Math.max(left, right) + 1;
};

//////////////// TAIL RECURSION
// Good space complexity, but bad time complexty
// !!!!!!!!!Good space complexity cos of TAIL RECURSION implementation!!!!!!!!!
var maxDepth = function (root, acc = 0) {
  if (!root) return acc;

  return Math.max(maxDepth(root.left, acc + 1), maxDepth(root.right, acc + 1));
};

//////////////The same as above but NO TAIL RECURSION
// Worse space complexity and still  bad time complexty
/* var maxDepth = function (root, total = 0) {
  if (!root ) {
    return total;
  }

  total++;
  total = Math.max(maxDepth(root.left, total), maxDepth(root.right, total));
  return total;
};
 */

//////////////// ITERATIVE IMPLEMENTATION
var maxDepth = (root) => {
  if (!root) return 0;

  let stack = [[root, 1]],
    ans = 0;

  while (stack.length) {
    let [node, depth] = stack.pop();
    ans = Math.max(ans, depth);

    if (node.left) stack.push([node.left, depth + 1]);
    if (node.right) stack.push([node.right, depth + 1]);
  }

  return ans;
};

// BFS
var bsfDepth = (root) => {
  let queue = [root],
    depth = 0;

  while (queue.length) {
    let nodesOnCurLevel = queue.length,
      nextQueue = [];

    for (let i = 0; i < nodesOnCurLevel; i++) {
      let node = queue[i];

      if (node.right || node.left) {
        if (node.left) nextQueue.push(node.right);
        if (node.left) nextQueue.push(node.left);
        depth++;
      }
    }

    queue = nextQueue;
  }

  return depth;
};

// [3, 9, 20, null, null, 15, 7];

// console.log(maxDepth(tree));

var dfsHelper = (node, targetVal) => {
  if (!node) return false;

  currentDif = targetVal - node.val;

  if (currentDif === 0 && !node.left && !node.right) {
    return true;
  }

  return (
    dfsHelper(node.left, targetVal - node.val) ||
    dfsHelper(node.right, targetVal - node.val)
  );
};

var hasPathSum = (root, targetSum) => {
  return dfsHelper(root, targetSum);
};

///// The same as above Iterative Implementation
var hasPathSum = (root, targetSum) => {
  let stack = [[root, 0]];

  while (stack.length) {
    let [node, currSum] = stack.pop();

    currSum += node.val;
    if (currSum === targetSum && !node.left && !node.right) return true;

    if (node.left) stack.push([node.left, currSum]);
    if (node.right) stack.push([node.right, currSum]);
  }

  return false;
};

// console.log(hasPathSum(tree, 12));

/* 1448. Count Good Nodes in Binary Tree
  Medium
  4.4K
  119
  Companies
  Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

  Return the number of good nodes in the binary tree. 
  Example 1:

  Input: root = [3,1,4,3,null,1,5]
  Output: 4
  */

// It's NOT a TAIL Rec!
// Cos you need to return back to parent call to make calculations with results
var dfsCoutHelper = (node, curMax) => {
  let count = 0;
  if (!node) return count;

  if (node.val >= curMax) {
    count = 1;
    curMax = node.val;
  }

  return (
    count + dfsCoutHelper(node.left, curMax) + dfsCoutHelper(node.right, curMax)
  );
};

var dfsCoutHelper = (node, curMax, prevCount = 0) => {
  let count = prevCount / 2 || 0;
  if (!node) return count;

  if (node.val >= curMax) {
    count += 1;
    curMax = node.val;
  }

  return (
    dfsCoutHelper(node.left, curMax, count) +
    dfsCoutHelper(node.right, curMax, count)
  );
};

var goodNodes = function (root) {
  return dfsCoutHelper(root, -Infinity);
};

///// The same as above Iterative Implementation
var goodNodes = function (root) {
  let stack = [[root, -Infinity]],
    count = 0;

  while (stack.length) {
    let [node, curMax] = stack.pop();

    if (node.val >= curMax) {
      curMax = node.val;
      count++;
    }

    if (node.left) stack.push([node.left, curMax]);
    if (node.right) stack.push([node.right, curMax]);
  }

  return count;
};

/* 236. Lowest Common Ancestor of a Binary Tree
  Medium
  13.1K
  315
  Companies
  Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

  According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).” 

  Example 3:

  Input: root = [1,2], p = 1, q = 2
  Output: 1


  Explanation: How can we tell if a node is the LCA? Let's say that we are at the root, then there are 3 possibilities.

  The root node is p or q. The answer cannot be below the root node, because then it would be missing the root (which is either p or q) as a descendant.
  One of p or q is in the left subtree, and the other one is in the right subtree. The root must be the answer, because it is the connection point between the two subtrees, and thus the lowest node to have both p and q as descendants.
  Both p and q are in one of the subtrees. In that case, the root is not the answer because we could look inside the subtree and find a "lower" node.
*/

var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;

  if (root === p || root === q) return root;

  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;

  if (left) return left;

  return right;
};

/* Minimum Depth of Binary Tree

  Solution
  Given a binary tree, find its minimum depth.

  The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node. 
*/

tree = {
  val: 3,
  left: { val: 9, left: null, rigt: null },
  right: {
    val: 20,
    left: { val: 15, left: null, rigt: null },
    right: { val: 7, left: null, rigt: null },
  },
};
/* tree = {
  val: 3,
  left: null,
  right: {
    val: 20,
    left: null,
    right: { val: 7, left: null, rigt: { val: 6, left: null, right: null } },
  },
}; */

var minDepth = function (root) {
  if (root === null) return 0;

  if (root.right === null) return minDepth(root.right + 1);
  if (root.left === null) return minDepth(root.left + 1);

  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

var minDepth = function (root, depth = 0) {
  if (!root) return 0;

  ++depth;
  if (!root.left && !root.right) return depth;

  if (root.left === null) return minDepth(root.right, depth);
  if (root.right === null) return minDepth(root.left, depth);

  return Math.min(minDepth(root.left, depth), minDepth(root.right, depth));
};

// console.log(minDepth(tree));

/* Maximum Difference Between Node and Ancestor

Solution
Given the root of a binary tree, find the maximum value v for which there exist different nodes a and b where v = |a.val - b.val| and a is an ancestor of b.

A node a is an ancestor of b if either: any child of a is equal to b or any child of a is an ancestor of b.
*/
var dfsMaxDifHelper = (root, curMax, curMin) => {
  if (!root) return curMax - curMin;

  if (root.val > curMax) curMax = root.val;
  if (root.val < curMin) curMin = root.val;

  return Math.max(
    dfsMaxDifHelper(root.left, curMax, curMin),
    dfsMaxDifHelper(root.right, curMax, curMin)
  );
};
var maxAncestorDiff = function (root) {
  return dfsMaxDifHelper(root, root.val, root.val);
};

/* Diameter of Binary Tree

  Solution
  Given the root of a binary tree, return the length of the diameter of the tree.

  The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

  The length of a path between two nodes is represented by the number of edges between them. 
  The diameter/width of a tree is defined as the number of nodes on the longest path between two end nodes. 
*/

var diameterOfBinaryTree = function (root) {
  let diametr = 0;

  dfsDiameterHelper(root);

  function dfsDiameterHelper(root) {
    if (!root) return 0;

    let leftLen = dfsDiameterHelper(root.left);
    let rightLen = dfsDiameterHelper(root.right);

    diametr = Math.max(diametr, leftLen + rightLen);

    return Math.max(leftLen, rightLen) + 1;
  }

  return diametr;
};

tree = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4 },
    right: { val: 5, left: null, right: { val: 6, left: { val: 7 } } },
  },
  right: {
    val: 3,
  },
};
// console.log(diameterOfBinaryTree(tree));

/////////////////////////////////////// Breadth First Search (BFS)
var bfs = (root) => {
  let queue = [root];
  while (queue.length) {
    let nodesInCurrentLevel = queue.length,
      nextQueue = [];

    for (let i = 0; i < nodesInCurrentLevel; i++) {
      let node = queue[i];

      // Do some logic to node.val
      console.log(node.val);

      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }

    queue = nextQueue;
  }

  return;
};
tree = {
  val: 'root',
  left: {
    val: 'L1',
    left: { val: 'LL2' },
    right: { val: 'LR2' },
  },
  right: {
    val: 'R1',
    left: { val: 'LR2', left: null, right: null },
    right: { val: 'RR2', left: null, right: null },
  },
};
// console.log(bfs(tree)); // res: ['root', L1, R1, LL2, LR2, LR2, RR2];

/* 199. Binary Tree Right Side View
  Medium
  9.1K
  542
  Companies
  Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom. */
var rightSideView = function (root) {
  if (!root) return [];

  let queue = [root],
    ans = [];

  while (queue.length) {
    let nodesOnCurLevel = queue.length,
      nextQueue = [];

    for (let i = 0; i < nodesOnCurLevel; i++) {
      let node = queue[i];
      if (i === 0) ans.push(node.val);

      if (node.right) nextQueue.push(node.right);
      if (node.left) nextQueue.push(node.left);
    }

    queue = nextQueue;
  }

  return ans;
};

// console.log(rightSideView(tree));

/* 515. Find Largest Value in Each Tree Row
  Medium

  Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).
 */
var largestValues = function (root) {
  if (!root) return [];

  let queue = [root],
    ans = [];

  while (queue.length) {
    let nodeInRow = queue.length,
      nextQueue = [],
      curMax = queue[0].val;

    for (let i = 0; i < nodeInRow; i++) {
      let node = queue[i];
      curMax = Math.max(curMax, node.val);

      if (node.right) nextQueue.push(node.right);
      if (node.left) nextQueue.push(node.left);
    }

    ans.push(curMax);
    queue = nextQueue;
  }

  return ans;
};
// console.log(largestValues(tree));

/* Deepest Leaves Sum

  Solution
Given the root of a binary tree, return the sum of values of its deepest leaves.
 */

var dfsDepth = (root) => {
  if (!root) return 0;

  let left = dfsDepth(root.left);
  let right = dfsDepth(root.right);

  return Math.max(left, right) + 1;
};

var bsfDepth = (root) => {
  let queue = [root],
    depth = 0;

  while (queue.length) {
    let nodesOnCurLevel = queue.length,
      nextQueue = [];

    for (let i = 0; i < nodesOnCurLevel; i++) {
      let node = queue[i];

      if (node.right || node.left) {
        if (node.left) nextQueue.push(node.right);
        if (node.left) nextQueue.push(node.left);
        depth++;
      }
    }

    queue = nextQueue;
  }

  return depth;
};

var bsfSummOfLastLevel = (root, count) => {
  let queue = [root],
    sum = 0;

  while (queue.length) {
    let curLevelNodes = queue.length,
      nextQueue = [];

    if (count === 1) {
      for (let i = 0; i < curLevelNodes; i++) {
        sum += queue[i].val;
      }

      return sum;
    } else {
      for (let i = 0; i < curLevelNodes; i++) {
        let node = queue[i];

        if (node.left) nextQueue.push(node.left);
        if (node.right) nextQueue.push(node.right);
      }

      queue = nextQueue;
      count--;
    }
  }

  return sum;
};

var deepestLeavesSum = function (root) {
  // find trees depth
  let depth = dfsDepth(root);

  // Calc the sum of the deepest level's nodes
  return bsfSummOfLastLevel(root, depth);
};

tree = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4 },
    right: { val: 5, left: null, right: { val: 6, left: { val: 7 } } },
  },
  right: {
    val: 3,
  },
};
// console.log(deepestLeavesSum(tree));

/*  Binary Tree Zigzag Level Order Traversal

  Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between). 

  Input: root = [3,9,20,null,null,15,7]
  Output: [[3],[20,9],[15,7]]
*/
var zigzagLevelOrder = function (root) {
  if (!root) return [];

  let level = 1,
    queue = [root],
    ans = [];

  while (queue.length) {
    let nextQueue = [],
      nodesOnCurLevel = queue.length;

    let localAns = [];
    for (let i = nodesOnCurLevel - 1; i >= 0; i--) {
      let node = queue[i];
      localAns.push(node.val);

      if (level % 2) {
        if (node.left) nextQueue.push(node.left);
        if (node.right) nextQueue.push(node.right);
      } else {
        if (node.right) nextQueue.push(node.right);
        if (node.left) nextQueue.push(node.left);
      }
    }
    ans.push(localAns);

    queue = nextQueue;
    level++;
  }

  return ans;
};
