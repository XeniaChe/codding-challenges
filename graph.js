////////////////////////////////////////////// DFS Traversal

// Building a graph from the Array Of Edges input format
// e.g. [[0,1], [0,2], [1,3]]
// [0, 1] = 0 connected to 1
// [0, 2] =  0 connected to 2
// [1,3] =  1 connected to 3
let buildGraph = (edges) => {
  let graph = new Map();

  for (const [x, y] of edges) {
    if (!graph.hast(x)) {
      graph.set(x, []);
    }

    graph.get(x).push(y);

    // For the UNDIRECTED graph
    if (!graph.has(y)) {
      graph.set(y, []);
    }

    graph.get(y).push(x);
  }
};

/* Number of Provinces
  Medium
  There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

  A province is a group of directly or indirectly connected cities and no other cities outside of the group.

  You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

  Return the total number of provinces. 
*/
const dfs = (map, node, seen) => {
  let neighbors = map.get(node);

  if (neighbors) {
    for (const neighbor of neighbors) {
      // To prevent a loop cos it's an undirected graph
      // Mars all node's neighbors and the neighbor's neighbors as seen
      if (!seen.has(neighbor)) {
        // seen[neighbor] = true;
        seen.add(neighbor);

        dfs(map, neighbor, seen);
      }
    }
  }
};

// The same as above iteratively
let dfsStack = (map, node, seen) => {
  let stack = [node];
  while (stack.length) {
    let node = stack.pop();
    for (const neighbor of map.get(node)) {
      if (!seen.has(neighbor)) {
        // seen[neighbor] = true;
        seen.add(neighbor);
        stack.push(neighbor);
      }
    }
  }
};

var findCircleNum = function (isConnected) {
  // Build a Graph
  let graph = new Map(),
    n = isConnected.length,
    ans = 0;

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j]) {
        graph.get(i).push(j);
        graph.get(j).push(i);
      }
    }
  }

  // Build an arr of seen=visited nodes
  // Initially all false
  // let seen = new Array(n).fill(false);
  let seen = new Set();

  for (let i = 0; i < n; i++) {
    if (!seen.has(i)) {
      ans++;
      // seen[i] = true;
      seen.add(i);

      // To prevent a loop cos it's an undirected graph
      dfs(graph, i, seen);
    }
  }

  return ans;
};

let isConnected = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];

// console.log(findCircleNum(isConnected));

const visit = (twoDimArr) => {
  for (let i = 0; i < twoDimArr.length; i++) {
    for (let j = 0; j < twoDimArr.length; j++) {
      console.log(twoDimArr[i][j]);
    }
  }
};
let twoDimArr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
// console.log(visit(twoDimArr));

/* Number of Islands
  Medium
  Companies
  Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

  An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

  Example 1:

  Input: grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  Output: 1
*/

const isValid = (row, col, grid) => {
  let m = grid.length,
    n = grid[0].length;

  return row >= 0 && row < m && col >= 0 && col < n && grid[row][col] === '1';
};

var dfsNumIslands = (row, col, grid, seen) => {
  // Since An island is formed by connecting adjacent lands horizontally or vertically
  // You have to check one node up, one down, one to the left, one to the right
  let directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];

  for (const [dx, dy] of directions) {
    let nextRow = row + dy,
      nextCol = col + dx;

    if (isValid(nextRow, nextCol, grid) && !seen[nextRow][nextCol]) {
      seen[nextRow][nextCol] = true;

      dfsNumIslands(nextRow, nextCol, grid, seen);
    }
  }
};

var numIslands = function (grid) {
  let m = grid.length,
    n = grid[0].length,
    seen = [],
    ans = 0;

  // Build a map to track visited nodes of the same size as grid
  // With each square = false (NOT visited node) initially
  for (let i = 0; i < m; i++) {
    seen.push(new Array(n).fill(false));
  }

  // Loop over that map of visited nodes
  // Match every visited node as 'true'
  // And count all the Connected Components = ans
  for (let i = 0; i < m; i++) {
    // rows
    for (let j = 0; j < n; j++) {
      // cols
      if (grid[i][j] === '1' && !seen[i][j]) {
        ans++;

        // To track all the nodes connected=neighbors to this node
        dfsNumIslands(i, j, grid, seen);
      }
    }
  }

  return ans;
};
let grid = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
];

grid = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];
// console.log(numIslands(grid));

/* Reorder Routes to Make All Paths Lead to the City Zero
  Medium
  There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

  Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.

  This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

  Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.

  It's guaranteed that each city can reach city 0 after reorder.

 */
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (n, connections) {
  let convertToHash = (row, col) => {
    return row + ',' + col;
  };

  let dfs = (node) => {
    let ans = 0;
    for (const neighbor of graph.get(node)) {
      if (!seen[neighbor]) {
        if (roads.has(convertToHash(node, neighbor))) {
          ans++;
        }

        seen[neighbor] = true;
        ans += dfs(neighbor);
      }
    }

    return ans;
  };

  let roads = new Set();
  let graph = new Map();
  let seen = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [x, y] of connections) {
    graph.get(x).push(y);
    graph.get(y).push(x);
    roads.add(convertToHash(x, y));
  }

  seen[0] = true;
  return dfs(0);
};

/* Keys and Rooms
  Medium

  There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.

  When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.

  Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.
 */

const dfsVisitRooms = (rooms, node, seen) => {
  let neighbors = rooms[node];

  for (const neighbor of neighbors) {
    if (!seen.has(neighbor)) {
      seen.add(neighbor);

      dfsVisitRooms(rooms, neighbor, seen);
    }
  }
};

var canVisitAllRooms = function (rooms) {
  let seen = new Set([0]);

  dfsVisitRooms(rooms, 0, seen);

  return seen.size === rooms.length;
};

let rooms = [[1], [2], [3], []]; // true
rooms = [[1, 3], [3, 0, 1], [2], [0]]; // false
// console.log(canVisitAllRooms(rooms));

/* Minimum Number of Vertices to Reach All Nodes
  Medium
  Given a directed acyclic graph, with n vertices numbered from 0 to n-1, and an array edges where edges[i] = [fromi, toi] represents a directed edge from node fromi to node toi.

  Find the smallest set of vertices from which all nodes in the graph are reachable. It's guaranteed that a unique solution exists.

  Notice that you can return the vertices in any order. 
*/
/* 
// Worked but there is more elegant solution
const dfsFindSetVertices = (vertex, graph, seen) => {
  let neighbors = graph.get(vertex);

  if (neighbors) {
    for (const neighbor of neighbors) {
      if (!seen[neighbor]) {
        seen[neighbor] = true;

        dfsFindSetVertices(neighbor, graph, seen);
      }
    }
  }
};

var findSmallestSetOfVertices = function (n, edges) {
  let graph = new Map(),
    seen = new Array(n).fill(false),
    ans = [];

  for (let [from, to] of edges) {
    if (!graph.has(from)) {
      graph.set(from, []);
    }

    graph.get(from).push(to);
  }

  for (let i = 0; i < n; i++) {
    if (!seen[i]) {
      dfsFindSetVertices(i, graph, seen);
    }
  }

  for (let i = 0; i < n; i++) {
    if (!seen[i]) ans.push(i);
  }

  return ans;
}; */
// OR aftre the HINT
// We only have to count the number of nodes with zero incoming edges.

var findSmallestSetOfVertices = function (n, edges) {
  let inComing = new Set(),
    ans = [];

  for (const [_, to] of edges) {
    inComing.add(to);
  }

  for (let i = 0; i < n; i++) {
    if (!inComing.has(i)) ans.push(i);
  }

  return ans;
};

let n = 6,
  edges = [
    [0, 1],
    [0, 2],
    [2, 5],
    [3, 4],
    [4, 2],
  ];

(n = 5),
  (edges = [
    [0, 1],
    [2, 1],
    [3, 1],
    [1, 4],
    [2, 4],
  ]);
// console.log(findSmallestSetOfVertices(n, edges));

/* Find if Path Exists in Graph

  Solution
  There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

  You want to determine if there is a valid path that exists from vertex source to vertex destination.

  Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.
 */

const dfsValidPath = (graph, seen, node) => {
  let neighbors = graph.get(node);

  if (neighbors) {
    for (const neighbor of neighbors) {
      if (!seen[neighbor]) {
        seen[neighbor] = true;

        dfsValidPath(graph, seen, neighbor);
      }
    }
  }
};

var validPath = function (n, edges, source, destination) {
  if (source === destination) return true;

  // Build a bi-directional graph
  let graph = new Map(),
    seen = new Array(n).fill(false);

  for (const [from, to] of edges) {
    if (!graph.has(from)) {
      graph.set(from, []);
    }

    if (!graph.has(to)) {
      graph.set(to, []);
    }

    graph.get(from).push(to);
    graph.get(to).push(from);
  }

  // Start traversing from S
  dfsValidPath(graph, seen, source);

  return seen[destination];
};

// TODO: add second sol-n BIDIERCTIONAL SEARCH
(n = 3),
  (edges = [
    [0, 1],
    [1, 2],
    [2, 0],
  ]);
let source = 0,
  destination = 2;

(n = 6),
  (edges = [
    [0, 1],
    [0, 2],
    [3, 5],
    [5, 4],
    [4, 3],
  ]),
  (source = 0),
  (destination = 5);
// console.log(validPath(n, edges, source, destination));

/* Number of Connected Components in an Undirected Graph

  Solution
  You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

  Return the number of connected components in the graph.
 */
var countComponents = function (n, edges) {
  // BUild a raph
  let graph = new Map(),
    visited = new Set(),
    ans = 0;

  for (const [from, to] of edges) {
    if (!graph.has(from)) {
      graph.set(from, []);
    }

    if (!graph.has(to)) {
      graph.set(to, []);
    }

    graph.get(from).push(to);
    graph.get(to).push(from);
  }
  // Traverse over it

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      // Count components
      ans++;

      visited.add(i);

      dfs(graph, i, visited);
    }
  }

  return ans;
};

(n = 5),
  (edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ]);
// console.log(countComponents(n, edges));

/* Max Area of Island

  Solution
  You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

  The area of an island is the number of cells with a value 1 in the island.

  Return the maximum area of an island in grid. If there is no island, return 0.

*/

const dfsMaxArea = (visited, grid, row, col, area) => {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  for (const [dx, dy] of directions) {
    let nextRow = row + dx,
      nextCol = col + dy;

    let check =
      nextRow < grid.length &&
      nextRow >= 0 &&
      nextCol >= 0 &&
      nextCol < grid[0].length;

    if (check && !visited[nextRow][nextCol] && grid[nextRow][nextCol] === 1) {
      area++;
      visited[nextRow][nextCol] = true;

      area = /* 1 +  */ dfsMaxArea(visited, grid, nextRow, nextCol, area);
    }
  }

  return area;
};

var maxAreaOfIsland = function (grid) {
  let visited = [],
    area = 0,
    maxArea = 0;

  for (let i = 0; i < grid.length; i++) {
    visited.push(new Array(grid[0].length).fill(false));
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (!visited[row][col] && grid[row][col] === 1) {
        area++;
        visited[row][col] = true;

        area = /* 1 + */ dfsMaxArea(visited, grid, row, col, area);
      }

      maxArea = Math.max(area, maxArea);
      area = 0;
    }
  }

  return maxArea;
};

const dfsMaxArea2 = (visited, grid, row, col, area) => {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  for (const [dx, dy] of directions) {
    let nextRow = row + dx,
      nextCol = col + dy;

    let check =
      nextRow < grid.length &&
      nextRow >= 0 &&
      nextCol >= 0 &&
      nextCol < grid[0].length;

    if (check && !visited[nextRow][nextCol] && grid[nextRow][nextCol] === 1) {
      area.val++;

      visited[nextRow][nextCol] = true;

      dfsMaxArea2(visited, grid, nextRow, nextCol, area);
    }
  }
};

var maxAreaOfIsland2 = function (grid) {
  let visited = [],
    area = { val: 0 },
    maxArea = { val: 0 };

  for (let i = 0; i < grid.length; i++) {
    visited.push(new Array(grid[0].length).fill(false));
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (!visited[row][col] && grid[row][col] === 1) {
        area.val++;
        visited[row][col] = true;

        dfsMaxArea2(visited, grid, row, col, area, maxArea);
        maxArea.val = Math.max(area.val, maxArea.val);
      }
      area.val = 0;
    }
  }

  return maxArea.val;
};
grid = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];
// console.log(maxAreaOfIsland2(grid));

const dfsTest = (grid, row, col, sum) => {
  let m = grid.length,
    n = grid[0].length;

  let rowCheck = row < m && row >= 0;
  let colCheck = col < n && col >= 0;

  if (!rowCheck || !colCheck || !grid[row][col]) return /* sum */;

  if (grid[row][col]) {
    sum.val++;
    grid[row][col] = 0;

    /* sum =  */ dfsTest(grid, row + 1, col, sum);
    /* sum =  */ dfsTest(grid, row - 1, col, sum);
    /* sum =  */ dfsTest(grid, row, col + 1, sum);
    /* sum =  */ dfsTest(grid, row, col - 1, sum);
  }

  // return sum;
};
const test = (grid) => {
  /*let  sum =  0  */
  let sum = { val: 0 },
    m = grid.length,
    n = grid[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j]) {
        /* sum +=  */ dfsTest(grid, i, j, sum);
      }
    }
  }

  return sum.val;
};
let testGr = [
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// console.log(test(testGr));
/* Reachable Nodes With Restrictions

  Solution
  There is an undirected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.

  You are given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree. You are also given an integer array restricted which represents restricted nodes.

  Return the maximum number of nodes you can reach from node 0 without visiting a restricted node.

  Note that node 0 will not be a restricted node.
 */

const dfsReachableNodes = (graph, node, visited, restricted) => {
  if (!visited.has(node)) {
    visited.add(node);
  }

  let neighbors = graph.get(node);

  if (neighbors) {
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !restricted.has(neighbor)) {
        visited.add(neighbor);

        dfsReachableNodes(graph, neighbor, visited, restricted);
      }
    }
  }
};

var reachableNodes = function (n, edges, restricted) {
  let graph = new Map(),
    visited = new Set(),
    restr = new Set(restricted);

  for (const [from, to] of edges) {
    if (!graph.has(from)) {
      graph.set(from, []);
    }

    if (!graph.has(to)) {
      graph.set(to, []);
    }

    graph.get(from).push(to);
    graph.get(to).push(from);
  }

  dfsReachableNodes(graph, 0, visited, restr);

  return visited.size;
};
(n = 7),
  (edges = [
    [0, 1],
    [0, 2],
    [0, 5],
    [0, 4],
    [3, 2],
    [6, 5],
  ]);
let restricted = [4, 2, 1];
// console.log(reachableNodes(n, edges, restricted));

////////////////////////////////////////////// BFS Traversal
/**
 * 
/*  Shortest Path in Binary Matrix
  Medium
  Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

  A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

  All the visited cells of the path are 0.
  All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
  The length of a clear path is the number of visited cells of this path.

*/

var shortestPathBinaryMatrix = function (grid) {
  let valid = (row, col) => {
    return 0 <= row && row < n && 0 <= col && col < n && grid[row][col] == 0;
  };

  if (grid[0][0] == 1) {
    return -1;
  }

  let n = grid.length;
  let seen = [];
  for (let i = 0; i < n; i++) {
    seen.push(new Array(n).fill(false));
  }
  seen[0][0] = true;

  let queue = [[0, 0]]; // row, col
  let directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
  ];
  let steps = 0;

  while (queue.length) {
    let currentLength = queue.length;
    let nextQueue = [];
    steps++;

    for (let i = 0; i < currentLength; i++) {
      let [row, col] = queue[i];
      if (row == n - 1 && col == n - 1) {
        return steps;
      }

      for (const [dx, dy] of directions) {
        let nextRow = row + dy,
          nextCol = col + dx;

        if (valid(nextRow, nextCol) && !seen[nextRow][nextCol]) {
          seen[nextRow][nextCol] = true;
          nextQueue.push([nextRow, nextCol]);
        }
      }
    }

    queue = nextQueue;
  }

  return -1;
};

/* All Nodes Distance K in Binary Tree
  Medium
  7.9K
  156
  Companies
  Given the root of a binary tree, the value of a target node target, and an integer k, return an array of the values of all nodes that have a distance k from the target node.

  You can return the answer in any order.
 */
const dfsTreeToGraph = (root, graph, parentVal = null) => {
  graph ??= new Map();

  if (!root) return;

  if (!graph.has(root.val)) {
    graph.set(root.val, []);
  }

  if (parentVal !== null) {
    graph.get(root.val).push(parentVal);
  }

  parentVal = root.val;

  if (root.left) {
    graph.get(root.val).push(root.left.val);
  }
  dfsTreeToGraph(root.left, graph, parentVal);

  if (root.right) {
    graph.get(root.val).push(root.right.val);
  }
  dfsTreeToGraph(root.right, graph, parentVal);

  return graph;
};

var distanceK = function (root, target, k) {
  // Transfrom the Tree into undidercted Graph (DFS) in order to
  // reach all nodes at distance k from target despite the the (left/right) location of the node in the original tree
  // Without this step you'll miss the node that are at dist k from target but NOT in the same subtree
  // let graph = new Map();
  let graph = dfsTreeToGraph(root);

  // Perform (BFS) traversal starting from 'target' k times
  let queue = [target],
    seen = new Set([target]);
  count = 0;

  while (queue.length) {
    // list all the node that will be in the queue after k iterations
    if (count === k) return queue;

    let nextQueue = [],
      curLevelNodes = queue.length;

    for (let i = 0; i < curLevelNodes; i++) {
      let nextLevelNodes = graph.get(queue[i]);

      if (nextLevelNodes) {
        for (const node of nextLevelNodes) {
          if (!seen.has(node)) {
            nextQueue.push(node);
            seen.add(node);
          }
        }
      }
    }

    queue = nextQueue;
    count++;
  }
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  let dfs = (node, parent) => {
    if (!node) {
      return;
    }

    node.parent = parent;
    dfs(node.left, node);
    dfs(node.right, node);
  };

  dfs(root, null);
  let queue = [target];
  let seen = new Set([target]);
  let distance = 0;

  while (queue.length && distance < k) {
    let currentLength = queue.length;
    let nextQueue = [];

    for (let i = 0; i < currentLength; i++) {
      let node = queue[i];
      for (const neighbor of [node.left, node.right, node.parent]) {
        if (neighbor && !seen.has(neighbor)) {
          seen.add(neighbor);
          nextQueue.push(neighbor);
        }
      }
    }

    queue = nextQueue;
    distance++;
  }

  return queue.map((node) => node.val);
};
let tree = {
  val: 3,
  left: {
    val: 5,
    left: { val: 6 },
    right: { val: 2, left: { val: 7 }, right: { val: 4 } },
  },
  right: {
    val: 1,
    left: { val: 0 },
    right: { val: 8 },
  },
};

tree = {
  val: 0,
  left: {
    val: 1,
    right: { val: 2 },
  },
  right: {
    val: 3,
  },
};
// console.log(distanceK(tree, 1, 2));

/* 542. 01 Matrix

  Given an m x n binary (every element is 0 or 1) matrix mat, find the distance of the nearest 0 for each cell.

  For example, given mat = [[0,0,0],[0,1,0],[1,1,1]], return [[0,0,0],[0,1,0],[1,2,1]].
 */
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  let valid = (row, col) => {
    return 0 <= row && row < m && 0 <= col && col < n && mat[row][col] == 1;
  };

  // if you don't want to modify the input, you can create a copy at the start
  m = mat.length;
  n = mat[0].length;
  let queue = [];
  let seen = [];
  for (let i = 0; i < m; i++) {
    seen.push(new Array(n).fill(false));
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (mat[row][col] == 0) {
        queue.push([row, col]);
        seen[row][col] = true;
      }
    }
  }

  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let steps = 0;

  while (queue.length) {
    let currentLength = queue.length;
    let nextQueue = [];
    steps++;

    for (let i = 0; i < currentLength; i++) {
      const [row, col] = queue[i];
      for (const [dx, dy] of directions) {
        let nextRow = row + dy,
          nextCol = col + dx;
        if (valid(nextRow, nextCol) && !seen[nextRow][nextCol]) {
          seen[nextRow][nextCol] = true;
          nextQueue.push([nextRow, nextCol]);
          mat[nextRow][nextCol] = steps;
        }
      }
    }

    queue = nextQueue;
  }

  return mat;
};

/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */

/* Shortest Path with Alternating Colors
  Medium
  You are given an integer n, the number of nodes in a directed graph where the nodes are labeled from 0 to n - 1. Each edge is red or blue in this graph, and there could be self-edges and parallel edges.

  You are given two arrays redEdges and blueEdges where:

  redEdges[i] = [ai, bi] indicates that there is a directed red edge from node ai to node bi in the graph, and
  blueEdges[j] = [uj, vj] indicates that there is a directed blue edge from node uj to node vj in the graph.
  Return an array answer of length n, where each answer[x] is the length of the shortest path from node 0 to node x such that the edge colors alternate along the path, or -1 if such a path does not exist
 
*/
let addToGraph = (color, edges) => {
  for (let i = 0; i < n; i++) {
    graph.get(color).set(i, []);
  }

  for (const [x, y] of edges) {
    graph.get(color).get(x).push(y);
  }
};

var shortestAlternatingPaths = function (n, redEdges, blueEdges) {
  const RED = 0;
  const BLUE = 1;

  let graph = new Map();
  graph.set(RED, new Map());
  graph.set(BLUE, new Map());
  addToGraph(RED, redEdges);
  addToGraph(BLUE, blueEdges);

  let ans = new Array(n).fill(Infinity);
  let queue = [
    [0, RED],
    [0, BLUE],
  ];
  let seen = [];
  for (let i = 0; i < n; i++) {
    seen.push(new Array(2).fill(false));
  }

  seen[0][RED] = true;
  seen[0][BLUE] = true;

  let steps = 0;

  while (queue.length) {
    let currentLength = queue.length;
    let nextQueue = [];

    for (let i = 0; i < currentLength; i++) {
      let [node, color] = queue[i];
      ans[node] = Math.min(ans[node], steps);

      for (const neighbor of graph.get(color).get(node)) {
        if (!seen[neighbor][1 - color]) {
          seen[neighbor][1 - color] = true;
          nextQueue.push([neighbor, 1 - color]);
        }
      }
    }

    queue = nextQueue;
    steps++;
  }

  for (let i = 0; i < n; i++) {
    if (ans[i] == Infinity) {
      ans[i] = -1;
    }
  }

  return ans;
};

/* Shortest Path in a Grid with Obstacles Elimination
  Hard
  3.9K
  71
  Companies
  You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.

  Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.
 */
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var shortestPath = function (grid, k) {
  let valid = (row, col) => {
    return 0 <= row && row < m && 0 <= col && col < n;
  };

  let m = grid.length;
  let n = grid[0].length;
  let queue = [[0, 0, k]];
  let seen = [];
  for (let i = 0; i < m; i++) {
    seen.push([]);
    for (let j = 0; j < n; j++) {
      seen[i].push(new Array(k + 1).fill(-1));
    }
  }

  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let steps = 0;

  while (queue.length) {
    let currentLength = queue.length;
    let nextQueue = [];

    for (let i = 0; i < currentLength; i++) {
      let [row, col, remain] = queue[i];
      if (row == m - 1 && col == n - 1) {
        return steps;
      }

      // if the current square is an obstacle, we need to spend one of our removals
      if (grid[row][col] == 1) {
        if (remain == 0) {
          continue;
        } else {
          remain--;
        }
      }

      // if the square has already been visited, but with more removals, then the current
      // path is pointless, since more removals is better
      if (seen[row][col] >= remain) {
        continue;
      }

      seen[row][col] = remain;
      for (const [dx, dy] of directions) {
        let nextRow = row + dy,
          nextCol = col + dx;
        if (valid(nextRow, nextCol)) {
          nextQueue.push([nextRow, nextCol, remain]);
        }
      }
    }

    queue = nextQueue;
    steps++;
  }

  return -1;
};
const bfsShortPath = (grid, k, seen, row, col) => {
  let directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ],
    steps = 0,
    queue = [[row, col]];

  while (queue.length) {
    let currNodes = queue.length,
      nextQueue = [];

    for (let i = 0; i < currNodes; i++) {
      let [curRow, curCol] = queue[i];

      if (grid[curRow][curCol] === 1 && k > 0) {
        k--;
      }

      if (
        ((k && grid[curRow][curCol] === 1) || grid[curRow][curCol] === 0) &&
        !seen[curRow][curCol]
      ) {
      }
    }
  }
};
var shortestPath = function (grid, k) {
  let seen = [],
    m = grid.length,
    n = grid[0].length;

  for (let i = 0; i < m; i++) {
    seen.push(new Array(n).fill(false));
  }
};

/* Nearest Exit from Entrance in Maze

Solution
You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls (represented as '+'). You are also given the entrance of the maze, where entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially standing at.

In one step, you can move one cell up, down, left, or right. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest exit from the entrance. An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit.

Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists. 
*/
const isInBorder = (m, n, row, col) =>
  row < m && row >= 0 && col < n && col >= 0;

const isBorder = (m, n, row, col) =>
  row === 0 || row === m - 1 || col === 0 || col === n - 1;

const bfsNearestExit = (matrix, seen, row, col) => {
  const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ],
    m = matrix.length,
    n = matrix[0].length;

  let queue = [[row, col]],
    steps = 0;

  while (queue.length) {
    let currNodes = queue.length,
      nextQueue = [];

    for (let i = 0; i < currNodes; i++) {
      const [row, col] = queue[i];

      if (
        isBorder(m, n, row, col) &&
        matrix[row][col] === '.' &&
        !seen[row][col]
      )
        return steps;

      for (const [dx, dy] of directions) {
        let nextRow = dx + row,
          nextCol = dy + col;

        if (
          isInBorder(m, n, nextRow, nextCol) &&
          matrix[nextRow][nextCol] === '.' &&
          !seen[nextRow][nextCol]
        ) {
          if (!isBorder(m, n, nextRow, nextCol)) {
            seen[nextRow][nextCol] = true;
          }

          nextQueue.push([nextRow, nextCol]);
        }
      }
    }

    steps++;
    queue = nextQueue;
  }

  return -1;
};

var nearestExit = function (maze, entrance) {
  let seen = [],
    m = maze.length,
    n = maze[0].length,
    [enRow, enCol] = entrance;

  for (let i = 0; i < m; i++) {
    seen.push(new Array(n).fill(false));
  }

  seen[enRow][enCol] = true;

  return bfsNearestExit(maze, seen, enRow, enCol);
};
let maze = [
    ['+', '+', '+'],
    ['.', '.', '.'],
    ['+', '+', '+'],
  ],
  entrance = [1, 0];

(maze = [
  ['+', '+', '.', '+'],
  ['.', '.', '.', '+'],
  ['+', '+', '+', '.'],
]),
  (entrance = [1, 2]);
(maze = [['.', '+']]), (entrance = [0, 0]);
// console.log(nearestExit(maze, entrance));
