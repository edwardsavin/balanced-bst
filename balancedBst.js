function Node(newData) {
  return {
    data: newData,
    left: null,
    right: null,
  };
}

function Tree(array) {
  function buildTree(array, start, end) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const node = Node(array[mid]);

    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);

    return node;
  }

  const filteredArray = array.filter(
    (item, index) => array.indexOf(item) === index
  );
  const sortedArray = filteredArray.sort((a, b) => a - b);
  let root = buildTree(sortedArray, 0, sortedArray.length - 1);

  function insertValue(root, value) {
    if (!root) {
      let newNode = Node(value);
      return newNode;
    }

    if (value < root.data) {
      root.left = insertValue(root.left, value);
    } else if (value > root.data) {
      root.right = insertValue(root.right, value);
    }

    return root;
  }

  function deleteValue(root, value) {
    if (!root) return null;

    // If value is less than the root, search in the left subtree
    if (value < root.data) {
      root.left = deleteValue(root.left, value);
      return root;
    }

    // If value is greater than the root, search in the right subtree
    if (value > root.data) {
      root.right = deleteValue(root.right, value);
      return root;
    }

    // If no children, just delete
    if (!root.left && !root.right) return (root = null);

    // If one child, copy child to node and delete the child
    if (root.left && !root.right) return root.left;
    if (!root.left && root.right) return root.right;

    // If two children, find the successor node and replace the current node with it
    let successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }
    root.data = successor.data;
    root.right = deleteValue(root.right, successor.data);
    return root;
  }

  function find(root, value) {
    if (!root) return null;
    if (value === root.data) return root;

    if (value < root.data) return find(root.left, value);
    return find(root.right, value);
  }

  function levelOrder(root, cb) {
    let values = [];
    let queue = [root];

    while (queue.length > 0) {
      let node = queue.shift();

      if (!cb) {
        values.push(node.data);
      } else {
        cb(node.data);
      }

      if (node.left) queue.push(node.left);

      if (node.right) queue.push(node.right);
    }

    if (!cb) return values;
  }

  function inorder(root, cb) {
    let values = [];

    function traverse(node) {
      if (!node) return null;

      traverse(node.left);

      if (cb) cb(node.data);

      values.push(node.data);

      traverse(node.right);
    }

    traverse(root);

    if (!cb) return values;
  }

  function preorder(root, cb) {
    let values = [];

    function traverse(node) {
      if (!node) return null;

      if (cb) cb(node.data);

      values.push(node.data);

      traverse(node.left);
      traverse(node.right);
    }

    traverse(root);

    if (!cb) return values;
  }

  function postorder(root, cb) {
    let values = [];

    function traverse(node) {
      if (!node) return null;

      traverse(node.left);
      traverse(node.right);

      if (cb) cb(node.data);

      values.push(node.data);
    }

    traverse(root);

    if (!cb) return values;
  }

  function height(node) {
    if (!node) return -1;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(node) {
    if (!node || node === root) return 0;

    let count = 0;
    let current = root;

    while (current !== node) {
      count++;

      if (current.data > node.data) {
        current = current.left;
      }
      if (current.data < node.data) {
        current = current.right;
      }
    }

    return count;
  }

  function isBalanced(node) {
    if (!node) return 0;

    // Check left subtree
    let leftHeight = isBalanced(node.left);
    if (leftHeight === -1) return -1;

    // Check right subtree
    let rightHeight = isBalanced(node.right);
    if (rightHeight === -1) return -1;

    // Check difference of left & right for current node
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    // If balanced, return the height
    return Math.max(leftHeight, rightHeight) + 1;
  }

  function rebalance() {
    if (isBalanced(root) !== -1) return;

    const newArray = inorder(root);

    this.root = buildTree(newArray, 0, newArray.length - 1);
  }

  return {
    root,
    insertValue,
    deleteValue,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export default Tree;
