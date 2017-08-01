import React, { Component } from 'react'
import { easyComp } from 'react-easy-state'
import store from './store'

class ContactCreator extends Component {
  state = {
    newContact: { name: '', email: '' }
  }

  addContact () {
    const { state } = this
    store.addContact(state.newContact)
    state.newContact = { name: '', email: '' }
  }

  onChange (ev) {
    const { newContact } = this.state
    newContact[ev.target.name] = ev.target.value
  }

  render () {
    const { addContact, onChange } = this
    const { newContact } = this.state

    return (
      <tr>
        <td><input name="name" value={newContact.name} onChange={onChange} placeholder="Contact name..."/></td>
        <td><input name="email" value={newContact.email} onChange={onChange} placeholder="Contact email..."/></td>
        <td><button onClick={addContact}>Add Contact</button></td>
      </tr>
    )
  }
}

export default easyComp(ContactCreator)
