import { easyStore } from 'react-easy-state'

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
      this.todos.forEach(todo => todo.completed = true)
    } else {
      this.todos.forEach(todo => todo.completed = false)
    }
  },
  get active () {
    return this.todos.filter(todo => !todo.completed)
  },

  create (title) {
    this.todos.push({ title, completed: false })
  },
  remove (todo) {
    this.todos.splice(this.todos.indexOf(todo), 1)
  },
  clearCompleted () {
    this.todos = this.active
  },
  toggleAll () {
    this.allCompleted = !this.allCompleted
  },
  changeFilter (filter) {
    this.filter = filter
  }
})
