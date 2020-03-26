import { store } from 'react-easy-state';

// a complex global store with a lot of derived data (getters and setters)
export default store({
  all: [],
  filter: 'all',
  get isEmpty() {
    return this.all.length === 0;
  },
  get completed() {
    return this.all.filter(todo => todo.completed);
  },
  get hasCompleted() {
    return this.completed.length !== 0;
  },
  get allCompleted() {
    return this.all.every(todo => todo.completed);
  },
  set allCompleted(completed) {
    this.all.forEach(todo => {
      todo.completed = completed;
    });
  },
  get active() {
    return this.all.filter(todo => !todo.completed);
  },
  create(title) {
    this.all.push({ title });
  },
  remove(id) {
    this.all.splice(id, 1);
  },
  toggle(id) {
    const todo = this.all[id];
    todo.completed = !todo.completed;
  },
  toggleAll() {
    this.allCompleted = !this.allCompleted;
  },
  clearCompleted() {
    this.all = this.active;
  },
});
