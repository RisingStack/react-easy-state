import { easyStore } from 'react-easy-state'

// a complex global store with a lot of derived data (getters and setters)
export default easyStore({
  filter: 'todos',
  todos: [],
  get hasTodos () {
    return this.todos.length !== 0
  },
  get completed () {
    return this.todos.filter(todo => todo.completed)
  },
  get hasCompleted () {
    return this.completed.length !== 0
  },
  get allCompleted () {
    return this.todos.every(todo => todo.completed)
  },
  set allCompleted (completed) {
    if (completed) {
      this.todos.forEach(todo => {
        todo.completed = true
      })
    } else {
      this.todos.forEach(todo => {
        todo.completed = false
      })
    }
  },
  get active () {
    return this.todos.filter(todo => !todo.completed)
  },
  create (ev) {
    if (ev.keyCode === 13) {
      this.todos.push({ title: ev.target.value })
      ev.target.value = ''
    }
  },
  changeFilter (ev) {
    this.filter = ev.target.value
  },
  remove (id) {
    this.todos.splice(id, 1)
  },
  toggle (id) {
    const todo = this.todos[id]
    todo.completed = !todo.completed
  },
  clearCompleted () {
    this.todos = this.active
  },
  toggleAll () {
    this.allCompleted = !this.allCompleted
  }
})
