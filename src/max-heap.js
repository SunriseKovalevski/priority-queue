const Node = require('./node');
class MaxHeap {
	constructor() {

	  this.root = null;
		this.parentNodes = [];
		
		this.sizeCount = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);

		this.insertNode(node);
		this.shiftNodeUp(node);

		this.sizeCount++;
	}

	pop() { 
	if ( this.isEmpty() ) {
		return;
	}

	this.sizeCount--;
	let detachedRoot = this.detachRoot();
	this.restoreRootFromLastInsertedNode(detachedRoot);  // ! doesn't work correct
	
	if ( !this.isEmpty() ) {
		this.shiftNodeDown(this.root);
	}

	return detachedRoot.data;
	}

	detachRoot() {
    let detachedRoot = this.root;
    
		this.root = null;
		
		if (detachedRoot.right == null) {
    	this.parentNodes.shift();
		}

    return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {  
		let lastNode;
		
		if (this.parentNodes.length > 0) {
			lastNode = this.parentNodes.pop();

			if (lastNode.parent && lastNode.parent.right == lastNode) {
				lastNode.parent.right = null;
			} else if (lastNode.parent && lastNode.parent.left == lastNode) {
				lastNode.parent.left = null;
			}
		} else {
			lastNode = detached;
		}

		this.root = lastNode
		if (this.root.parent != null) {
		this.root.parent = null;
		}
		
 		this.root.left = detached.left;
		this.root.right = detached.right;

		if (this.root == this.root.right) {
			this.root.right = null;
		}
		if (this.root == this.root.left) {
			this.root.left = null;
		}

		if (this.root.left != null) {
			this.root.left.parent = this.root;
		}
		if (this.root.right != null) {
			this.root.right.parent = this.root;
		}

		let lengthOfParentNodes = this.parentNodes.length;

		for (let i = 0; i < lengthOfParentNodes; i++) {
			if (this.parentNodes[i] != this.root && this.parentNodes[i].parent.right == null) {
				this.parentNodes.unshift(this.parentNodes[i].parent);
			}
		}

	}

	size() {
		return this.sizeCount;
	}

	isEmpty() {
		if ( this.sizeCount < 1 ) {
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];

		this.sizeCount = 0;
	}

	insertNode(node) {
		if (this.root == null) {
      this.root = node;
		} else {
      this.parentNodes[0].appendChild(node);
      if (this.parentNodes[0].right != null) {
        this.parentNodes.shift();
      }
    }
    this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if (!(node instanceof Node)) {
			throw 'Passed argument is not an instance of Node class.';
		}

		if (node.parent == null) {
			this.root = node;
		} else if (node.priority > node.parent.priority) {
			
			let parentInd = this.parentNodes.indexOf(node.parent);
			let nodeInd = this.parentNodes.indexOf(node);

			if (nodeInd != -1) {
				if (parentInd == -1) {
					this.parentNodes[nodeInd] = node.parent;
				} else {
					this.parentNodes[nodeInd] = node.parent;
					this.parentNodes[parentInd] = node;
				}
			}

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
}

	shiftNodeDown(node) {
		let biggerNode = node;
		
		if (node.left && (biggerNode.priority < node.left.priority) ) {
			biggerNode = node.left;
		}

		if (node.right && (biggerNode.priority < node.right.priority) ) {
			biggerNode = node.right;
		}

		if (biggerNode == node) {
			return;
		}

		let indexOfBigger = -1;
		let indxOfNode = -1;


		if (biggerNode.right == null) {
			indexOfBigger = this.parentNodes.indexOf(biggerNode);
		}
		if (node.right == null) {
			indxOfNode = this.parentNodes.indexOf(node);
		}


		if (indxOfNode != -1 && indexOfBigger != -1) {
			this.parentNodes[indexOfBigger] = node;
			this.parentNodes[indxOfNode] = biggerNode;
		}
		else if (indexOfBigger != -1) {
			this.parentNodes[indexOfBigger] = node;
		}


		biggerNode.swapWithParent();

		if (this.root == node) {
			this.root = biggerNode;
		}

		this.shiftNodeDown(node);

	}
}

module.exports = MaxHeap;