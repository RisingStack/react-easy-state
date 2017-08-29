import { easyStore } from 'react-easy-state'

// a complex global store with a lot of derived data (getters and setters)
export default easyStore({
  all: [],
  filter: 'all',
  get isEmpty () {
    return (this.all.length === 0)
  },
  get completed () {
    return this.all.filter(todo => todo.completed)
  },
  get hasCompleted () {
    return this.completed.length !== 0
  },
  get allCompleted () {
    return this.all.every(todo => todo.completed)
  },
  set allCompleted (completed) {
    this.all.forEach(todo => {
      todo.completed = completed
    })
  },
  get active () {
    return this.all.filter(todo => !todo.completed)
  },
  create (ev) {
    if (ev.keyCode === 13 && ev.target.value) {
      this.all.push({ title: ev.target.value })
      ev.target.value = ''
    }
  },
  changeFilter (ev) {
    this.filter = ev.target.value
  },
  remove (id) {
    this.all.splice(id, 1)
  },
  toggle (id) {
    const todo = this.all[id]
    todo.completed = !todo.completed
  },
  toggleAll () {
    this.allCompleted = !this.allCompleted
  },
  clearCompleted () {
    this.all = this.active
  }
})
