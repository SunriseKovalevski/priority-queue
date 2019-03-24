class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if ( this.left == null ) {
      this.left = node;
      node.parent = this;
		} else if ( this.right == null) {
      this.right = node;
      node.parent = this;
		}
	}

	removeChild(node) {
    if (node.parent == null) {
      throw new Error('Passed node is not a child of this node');
    } else if (node.parent.left == node) {
      node.parent.left = null;
    } else if (node.parent.right == node) {
      node.parent.right = null;
    }

    node.parent = null;
	}

	remove() {
    if (this.parent != null) {
      this.parent.removeChild(this);
    }
	}

	swapWithParent() {
    if (this.parent != null) {

			let thisNewParent = this.parent.parent;
			let thisLeft = this.left;
			let thisRight = this.right;
			let oldParent = this.parent;

			this.parent.parent = this;
			
			if (this.parent.left == this) {

				if (this.parent.right != null) {
				this.parent.right.parent = this;
				}

				this.right = this.parent.right;
				this.left = this.parent;
				this.left.right = thisRight;
				this.left.left = thisLeft;


				if (thisLeft != null) {
					this.left.left.parent = this.left;
				}
				if (thisRight != null) {
					this.left.right.parent = this.left;
				}

				this.parent = thisNewParent;
				
				if (this.parent != null) {
					if (this.parent.left == oldParent) {
						this.parent.left = this;
					} else {
						this.parent.right = this;
					}
				}


			}
			else {

				if (this.parent.left != null) {
				this.parent.left.parent = this;
				}

				this.left = this.parent.left;
				this.right = this.parent;
				this.right.right = thisRight;
				this.right.left = thisLeft;

				if (thisLeft != null) {
					this.right.left.parent = this.right;
				}
				if (thisRight != null) {
					this.right.right.parent = this.right;
				}

				this.parent = thisNewParent;

				if (this.parent != null) {
					if (this.parent.left == oldParent) {
						this.parent.left = this;
					} else {
						this.parent.right = this;
					}
				}
			}
    }
    
  }
  
}

module.exports = Node;