import { store } from 'react-easy-state'

// store the central data and logic of the application in a global app store
// use 'appStore' instead of 'this' in the store methods to make them passable as callbacks
const appStore = store({
  contacts: [],
  addContact (contact) {
    contact.name = contact.name || 'Placeholder'
    contact.email = contact.email || 'Placeholder'
    appStore.contacts.push(contact)
  },
  deleteContact (contact) {
    const idx = appStore.contacts.indexOf(contact)
    appStore.contacts.splice(idx, 1)
  }
})

export default appStore
