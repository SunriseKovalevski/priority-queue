const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root=null;
		this.parentNodes=[];
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {

	}

	isEmpty() {
		return (this.root===null)&&(this.parentNodes.length===0);
	}

	clear() {
		this.root=null;
		this.parentNodes=[];
	}

	insertNode(node) {
		if (this.root == null) {
			this.parentNodes[0]=node;
			this.root=this.parentNodes[0];
		} else {
			for (let i = 0; i <this.parentNodes.length; i++) {
				if (this.parentNodes[i].right===null) {
					this.parentNodes[i].appendChild(node);
					this.parentNodes.push(node);
				//	this.shiftNodeDown(node);
				}
			}
		}
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		function getIndex(node) {
			for (let i = 0; i < this.parentNodes.length; i++) {
				if (node===this.parentNodes[i]);
				return i;
			}
		}
		let i=getIndex(node);
		let left=2*i+1;
		let right=2*i+2;
		let largest=i;
		if (left<this.parentNodes.length && this.parentNodes[left].priority>this.parentNodes[i].priority) {
			largest=left;
		}
		if (right<this.parentNodes.length && this.parentNodes[right].priority>this.parentNodes[i].priority) {
			largest=right;
		}
		if (largest!==i){
			[this.parentNodes[i], this.parentNodes[largest]]=[this.parentNodes[largest], this.parentNodes[i]];
			node.swapWithParent();
			this.shiftNodeDown(this.parentNodes[largest]);
		}
	}
}

module.exports = MaxHeap;
