// 链表元素
function ListNode(val) {
  this.val = val;
  this.next = null;
}
// 树元素
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
// 数组转链表
function array2list(arr) {
  if (arr.length == 0 || arr.length == 1 && typeof arr[0] != 'number') {
    return null;
  }
  var listNode = new ListNode();
  var node = listNode;
  for (var i = 0; i < arr.length; i++) {
    node.next = new ListNode(arr[i]);
    node = node.next;
  }
  return listNode.next;
}
// 数组转二叉树
function array2tree(arr) {
  if (arr.length == 0 || arr.length == 1 && typeof arr[0] != 'number') {
    return null;
  }
  var tree = {};
  var left = [];
  var right = [];
  var i = 0;
  var len = 0;
  var fir = -1;
  while (fir < arr.length) {
    i++;
    len = Math.pow(2, i);
    fir = len - 1;
    left = left.concat(arr.slice(len - 1, len * 3/2 - 1));
    right = right.concat(arr.slice(len * 3/2 - 1, len * 2 - 1));
  }
  tree.val = arr[0];
  tree.left = array2tree(left);
  tree.right = array2tree(right);
  return tree;
}
// 快排
function quickSort(arr, compare) {
  if (arr.length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  const middle = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const ele = arr[i];
    if (compare(ele, middle)) {
      left.push(ele);
    } else {
      right.push(ele);
    }
  }
  const sortedLeft = quickSort(left, compare);
  const sortedRight = quickSort(right, compare);
  return sortedLeft.concat([middle]).concat(sortedRight);
}
class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }
  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  shiftDown() {
    let fatherIndex = 0;
    let tempIndex = fatherIndex;
    let leftChildIndex = fatherIndex * 2;
    let rightChildIndex = fatherIndex * 2 + 1;
    while (leftChildIndex < this.heap.length || rightChildIndex < this.heap.length) {
      if (leftChildIndex >= this.heap.length) {
        tempIndex = rightChildIndex;
      } else if (rightChildIndex >= this.heap.length) {
        tempIndex = leftChildIndex;
      } else {
        if (this.compare(this.heap[leftChildIndex], this.heap[rightChildIndex])) {
          tempIndex = leftChildIndex;
        } else {
          tempIndex = rightChildIndex;
        }
      }
      if (this.compare(this.heap[tempIndex], this.heap[fatherIndex])) {
        this.swap(tempIndex, fatherIndex);
        fatherIndex = tempIndex;
        leftChildIndex = fatherIndex * 2;
        rightChildIndex = fatherIndex * 2 + 1;
      } else {
        break;
      }
    }
  }
  shiftUp() {
    let fatherIndex = 0;
    let childIndex = this.heap.length - 1;
    while (childIndex > 0) {
      fatherIndex = Math.floor(childIndex / 2);
      if (this.compare(this.heap[childIndex], this.heap[fatherIndex])) {
        this.swap(childIndex, fatherIndex);
        childIndex = fatherIndex;
      } else {
        break;
      }
    }
  }
  push(ele) {
    this.heap = this.heap.concat([ele]);
    this.shiftUp();
  }
  pop() {
    const head = this.heap[0];
    this.swap(0, this.heap.length);
    this.heap = this.heap.slice(0, this.heap.length - 1);
    this.shiftDown();
    return head;
  }
  get(i = 0) {
    return this.heap[i];
  }
  set(i = 0, ele) {
    this.heap[i] = ele;
    this.shiftDown();
  }
  toArray() {
    return [...this.heap];
  }
}
class UnionFind {
  constructor(ids) {
    this.idMap = new Map();
    this.size = ids.length;
    ids.forEach(id => {
      this.idMap.set(id, id);
    })
  }
  get = (id) => {
    let iid = id;
    while (iid !== this.idMap.get(iid)) {
      iid = this.idMap.get(iid);
    }
    return iid;
  }
  set = (id1, id2) => {
    const iid1 = this.get(id1);
    const iid2 = this.get(id2);
    if (iid1 === iid2) return;
    this.idMap.set(iid1, iid2);
    this.size--;
  }
}
module.exports = {
  ListNode,
  TreeNode,
  array2tree,
  array2list,
  quickSort,
  Heap,
  UnionFind
}