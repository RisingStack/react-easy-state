import { store } from 'react-easy-state'

// a complex global store with a lot of derived data (getters and setters)
// use 'todos' instead of 'this' in the store methods to make them passable as callbacks
const todos = store({
  all: [],
  filter: 'all',
  get isEmpty () {
    return todos.all.length === 0
  },
  get completed () {
    return todos.all.filter(todo => todo.completed)
  },
  get hasCompleted () {
    return todos.completed.length !== 0
  },
  get allCompleted () {
    return todos.all.every(todo => todo.completed)
  },
  set allCompleted (completed) {
    todos.all.forEach(todo => {
      todo.completed = completed
    })
  },
  get active () {
    return todos.all.filter(todo => !todo.completed)
  },
  create (title) {
    todos.all.push({ title })
  },
  remove (id) {
    todos.all.splice(id, 1)
  },
  toggle (id) {
    const todo = todos.all[id]
    todo.completed = !todo.completed
  },
  toggleAll () {
    todos.allCompleted = !todos.allCompleted
  },
  clearCompleted () {
    todos.all = todos.active
  }
})

export default todos
