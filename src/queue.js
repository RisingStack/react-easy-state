import { isInsideBatch } from './scheduler'

class Queue {
  constructor () {
    this.taskSet = new Set()
  }

  add = task => {
    if (isInsideBatch) {
      this.taskSet.add(task)
    } else {
      task()
    }
  };

  flush = () => {
    if (this.taskSet.size !== 0) {
      this.taskSet.forEach(task => task())
      this.taskSet.clear()
    }
  };
}

export const queue = new Queue()
