/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

///////////////////////////////////////////////// TAIL RECURSION
// Good space complexity, but bad time complexty
// !!!!!!!!!Good space complexity cos of TAIL RECURSION implementation!!!!!!!!!
/* var maxDepth = function (root, acc = 0) {
  if (root === null) return acc;

  return Math.max(maxDepth(root.left, acc + 1), maxDepth(root.right, acc + 1));
}; */
///////////////////////////////////////////////The same as above but NO TAIL RECURSION
// Worse space complexity and still  bad time complexty
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
    left: { val: 15 },
    right: { val: 7 },
  },
};

[3, 9, 20, null, null, 15, 7];

console.log(maxDepth(tree));
