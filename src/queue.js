const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize=30) {
        this.heap = new MaxHeap(maxSize);
    }

	push(data, priority) {
		this.heap.push(data, priority);
	}

	shift() {
		this.heap.pop();
	}

	size() {

	}

	isEmpty() {

	}
}

module.exports = PriorityQueue;
