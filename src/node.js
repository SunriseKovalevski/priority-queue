class Node {
	constructor(data, priority) {
		this.data=data;
		this.priority=priority;
		this.parent=null;
		this.left=null;
		this.right=null;
	}

	appendChild(node) {
		if (this.left===null){
			this.left=node;
			this.left.parent = this;
			this.left.parent.left = this.left;
		} else if (this.right===null){
			this.right=node;
			this.right.parent = this;
			this.right.parent.right = this.right;
		}
	}

	removeChild(node) {
		if (this.left===node){
			this.left.parent = null;
			this.left=null;
		} else if (this.right===node){
			this.right.parent = null;
			this.right=null;
		} else {
			throw new Error ("passed node is not a child of this node");
		}
	}

	remove() {
		if (this.parent === null){
		} else {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}
		else {

			let PWithNewDP = {};
			let granDad = this.parent.parent;
			PWithNewDP.left = this.left;
			PWithNewDP.right = this.right;

			if (this.left) {
				this.left.parent = this.parent;
			}
			if (this.right){
				this.right.parent = this.parent;
			}

			if (this.parent.left === this) {
				if (this.parent.right){
					this.parent.right.parent = this;
				}
				this.right = this.parent.right;
				this.left=this.parent;
			} else if (this.parent.right === this) {
				if (this.parent.left){
					this.parent.left.parent = this;
				}
				this.left = this.parent.left;
				this.right=this.parent;
			}

			if (this.parent.parent) {
				if (this.parent.parent.left===this.parent) {
					this.parent.parent.left=this;
				} else if (this.parent.parent.right===this.parent) {
					this.parent.parent.right=this;
				}
			}


			this.parent.left = PWithNewDP.left;
			this.parent.right = PWithNewDP.right;

			this.parent.parent = this;
			this.parent = granDad;
		}
	}
}

module.exports = Node;
