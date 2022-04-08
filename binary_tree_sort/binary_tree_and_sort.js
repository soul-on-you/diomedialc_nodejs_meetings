class BinaryTree {
  constructor() {
    this.root = null;
  }

  add(value) {
    if (!this.root) {
      this.root = new TreeNode(value);
    } else {
      let node = this.root;
      let newNode = new TreeNode(value);
      while (node) {
        if (value > node.value) {
          if (!node.right) {
            break;
          }
          node = node.right;
        } else {
          if (!node.left) {
            break;
          }
          node = node.left;
        }
      }
      if (value > node.value) {
        node.right = newNode;
      } else {
        node.left = newNode;
      }
    }
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function printTree(node) {
  if (!node) {
    return "";
  }

  return node.value + printTree(node.left) + printTree(node.right);
}

const tree = new BinaryTree();

const array = [5, 2, 6, 2, 1, 9, 4, 6, 0, 7, 8, 8, 8];

array.forEach((n) => tree.add(n));

console.log(printTree(tree.root));

const prerightTreeWalk = (tree) => {
  if (!tree) {
    return 0;
  }

  let node = tree.root;
  let queue = [];

  rightTreeWalk(node, queue);

  console.log(queue);
};

const rightTreeWalk = (node, queue) => {
  if (node.left) {
    rightTreeWalk(node.left, queue);
  }

  queue.push(node.value);

  if (node.right) {
    rightTreeWalk(node.right, queue);
  }
};

prerightTreeWalk(tree);

//////

const tree2 = new BinaryTree();

const array2 = ["s", "daa","dac","m", "a", "b", "caa", "dуу", "e", "z", "y", "c", "cbb", "d", "dab"];

array2.forEach((n) => tree2.add(n));

console.log(printTree(tree2.root));

prerightTreeWalk(tree2);


