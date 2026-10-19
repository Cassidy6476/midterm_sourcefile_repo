// Name: Cassidy Leigh G. Mejia
// Section: BSIT WMT 2-2
// Subject: CC104

'use strict';

console.log('CAMPUS IT SUPPORT REQUEST MANAGER');

// ================================================================
// PART A: STACK
// ================================================================

class Stack {
  constructor() {
    // Internal storage for stack elements.
    this.items = [];
  }

  // Add an element to the top of the stack.
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top element.
  pop() {
    return this.items.pop();
  }

  // Return the top element without removing it.
  peek() {
    return this.items[this.items.length - 1];
  }

  // Return true when the stack has no elements.
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements in the stack.
  size() {
    return this.items.length;
  }

  // Return all elements as a comma-separated string.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART A: UNDO HISTORY');

const actionHistory = new Stack();

// Push the three required actions, in order.
actionHistory.push('Opened Ticket #101');
actionHistory.push('Assigned Ticket #101');
actionHistory.push('Closed Ticket #101');

// Display the current top action.
console.log('Top Action:', actionHistory.peek());

// Undo (remove) the most recent action.
console.log('Undo Action:', actionHistory.pop());

// Display the remaining actions and current stack size.
console.log('Remaining Actions:', actionHistory.toString());
console.log('Stack Size:', actionHistory.size());

// ================================================================
// PART B: QUEUE
// ================================================================

class Queue {
  constructor() {
    // Internal storage for queue elements.
    this.items = [];
  }

  // Add an element to the back of the queue.
  enqueue(element) {
    this.items.push(element);
  }

  // Remove and return the front element.
  dequeue() {
    return this.items.shift();
  }

  // Return the front element without removing it.
  front() {
    return this.items[0];
  }

  // Return true when the queue has no elements.
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements in the queue.
  size() {
    return this.items.length;
  }

  // Return all elements as a comma-separated string.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART B: WAITING REQUESTS');

const waitingRequests = new Queue();

// Enqueue the four required requests, in arrival order.
waitingRequests.enqueue('Ticket #201 - Password Reset');
waitingRequests.enqueue('Ticket #202 - No Internet');
waitingRequests.enqueue('Ticket #203 - Printer Problem');
waitingRequests.enqueue('Ticket #204 - Software Installation');

// Display the request currently at the front.
console.log('Next Request:', waitingRequests.front());

// Process (dequeue) two requests.
console.log('Processed:', waitingRequests.dequeue());
console.log('Processed:', waitingRequests.dequeue());

// Display the remaining queue and its size.
console.log('Remaining Requests:', waitingRequests.toString());
console.log('Queue Size:', waitingRequests.size());

// ================================================================
// PART C: PRIORITY QUEUE
// ================================================================

class PriorityQueue {
  constructor() {
    // Internal storage for {request, priority} items.
    this.items = [];
  }

  // Insert a request at the correct position based on priority.
  // Smaller priority numbers go first; equal priorities keep arrival order.
  enqueue(request, priority) {
    const queueItem = { request, priority };

    // Find the first item whose priority is greater (lower urgency).
    let insertIndex = this.items.length;
    for (let i = 0; i < this.items.length; i++) {
      if (queueItem.priority < this.items[i].priority) {
        insertIndex = i;
        break;
      }
    }

    // Insert without disturbing items of equal or higher priority
    // that arrived earlier (they stay before the new item).
    this.items.splice(insertIndex, 0, queueItem);
  }

  // Remove and return the first (highest-priority) item.
  dequeue() {
    return this.items.shift();
  }

  // Return the number of items in the priority queue.
  size() {
    return this.items.length;
  }

  // Display every request with its priority.
  print() {
    for (let i = 0; i < this.items.length; i++) {
      console.log(`${this.items[i].request}, Priority ${this.items[i].priority}`);
    }
  }
}

console.log('\nPART C: URGENT REQUESTS');

const urgentRequests = new PriorityQueue();

// Enqueue the four required requests, in the given order.
urgentRequests.enqueue('Ticket #301 - Install Browser', 3);
urgentRequests.enqueue('Ticket #302 - Server Offline', 1);
urgentRequests.enqueue('Ticket #303 - Faculty PC Failure', 2);
urgentRequests.enqueue('Ticket #304 - Internet Laboratory Down', 1);

// Print the initial priority order.
console.log('Initial Priority Order:');
urgentRequests.print();

// Process the first (highest-priority) request.
const processedUrgent = urgentRequests.dequeue();
console.log(`Processed Priority Request: ${processedUrgent.request}, Priority ${processedUrgent.priority}`);

// Print the remaining requests.
console.log('Remaining Priority Requests:');
urgentRequests.print();

// ================================================================
// PART D: LINKED LIST
// ================================================================

class Node {
  constructor(element) {
    // Store the value held by this node.
    this.element = element;
    // Pointer to the next node; null means end of the list.
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    // Number of nodes currently in the list.
    this.length = 0;
    // Reference to the first node.
    this.head = null;
  }

  // Add a new node containing element at the end of the list.
  append(element) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }

    this.length++;
  }

  // Insert a new node containing element at the given position.
  insert(position, element) {
    // Reject invalid positions.
    if (position < 0 || position > this.length) {
      return false;
    }

    const node = new Node(element);

    if (position === 0) {
      // Insert at the beginning.
      node.next = this.head;
      this.head = node;
    } else {
      // Insert in the middle or at the end.
      let current = this.head;
      let previous = null;
      let index = 0;

      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      node.next = current;
      previous.next = node;
    }

    this.length++;
    return true;
  }

  // Remove the node at the given position and return its element.
  removeAt(position) {
    // Reject invalid positions.
    if (position < 0 || position >= this.length) {
      return null;
    }

    let current = this.head;

    if (position === 0) {
      // Remove the first node.
      this.head = current.next;
    } else {
      let previous = null;
      let index = 0;

      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      previous.next = current.next;
    }

    this.length--;
    return current.element;
  }

  // Traverse the list and return the position of element, or -1 if absent.
  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  // Remove a node by its value, reusing indexOf and removeAt.
  remove(element) {
    const index = this.indexOf(element);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  // Return true when the list has no nodes.
  isEmpty() {
    return this.length === 0;
  }

  // Return the number of nodes in the list.
  size() {
    return this.length;
  }

  // Traverse the list and return all elements as a string.
  toString() {
    let result = [];
    let current = this.head;

    while (current !== null) {
      result.push(current.element);
      current = current.next;
    }

    return result.join(', ');
  }
}

console.log('\nPART D: COMPLETED REQUESTS');

const completedRequests = new LinkedList();

// Append the three required requests.
completedRequests.append('Ticket #401 - Account Activated');
completedRequests.append('Ticket #402 - Printer Connected');
completedRequests.append('Ticket #403 - Antivirus Updated');

// Insert Ticket #400 at position 0.
completedRequests.insert(0, 'Ticket #400 - Computer Diagnosed');

// Insert Ticket #405 at the end using insert().
completedRequests.insert(completedRequests.size(), 'Ticket #405 - Browser Updated');

// Display the complete list.
console.log('Complete List:', completedRequests.toString());

// Search for Ticket #402.
console.log('Index of Ticket #402:', completedRequests.indexOf('Ticket #402 - Printer Connected'));

// Remove the item at position 1 using removeAt().
console.log('Removed at Position 1:', completedRequests.removeAt(1));

// Remove Ticket #403 by value using remove().
console.log('Removed by Value:', completedRequests.remove('Ticket #403 - Antivirus Updated'));

// Display the final list and its size.
console.log('Final List:', completedRequests.toString());
console.log('Final Size:', completedRequests.size());
