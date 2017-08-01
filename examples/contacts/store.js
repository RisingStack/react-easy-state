import { easyStore } from 'react-easy-state'

export default easyStore({
  contacts: [],
  addContact (contact) {
    if (!contact.name || !contact.email) {
      throw new Error('Invalid Contact')
    }
    this.contacts.push(contact)
  },
  deleteContact (contact) {
    const idx = this.contacts.indexOf(contact)
    this.contacts.splice(idx, 1)
  }
})
