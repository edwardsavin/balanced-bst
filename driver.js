import Tree from "./balancedBst.js";

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function driver() {
  const randomArray = Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 100)
  );
  const newTree = Tree(randomArray);

  prettyPrint(newTree.root);

  console.log("Is balanced? (-1 = NO)", newTree.isBalanced(newTree.root));
  console.log("Level order:", newTree.levelOrder(newTree.root));
  console.log("Inorder:", newTree.inorder(newTree.root));
  console.log("Preorder:", newTree.preorder(newTree.root));
  console.log("Postorder:", newTree.postorder(newTree.root));
  newTree.insertValue(newTree.root, 175);
  newTree.insertValue(newTree.root, 200);
  newTree.insertValue(newTree.root, 225);
  newTree.insertValue(newTree.root, 250);
  newTree.insertValue(newTree.root, 275);
  newTree.insertValue(newTree.root, 300);
  newTree.insertValue(newTree.root, 325);
  newTree.insertValue(newTree.root, 350);
  newTree.insertValue(newTree.root, 375);
  console.log("Is balanced? (-1 = NO)", newTree.isBalanced(newTree.root));
  newTree.rebalance();
  console.log("Is balanced? (-1 = NO)", newTree.isBalanced(newTree.root));
  console.log("Inorder:", newTree.inorder(newTree.root));
  console.log("Preorder:", newTree.preorder(newTree.root));
  console.log("Postorder:", newTree.postorder(newTree.root));

  prettyPrint(newTree.root);
}

driver();
