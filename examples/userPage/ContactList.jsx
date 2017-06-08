import React, { Component } from 'react'
import { easyComp } from 'react-easy-state'
import store from './store'

@easyComp
export default class ContactList extends Component {
  state = {
    newContact: {}
  }

  render() {
    const { editNewContact, addNewContact } = this
    const { contacts } = this.props
    const { newContact } = this.state

    return (
      <div>
        <div>
          <p>New contact</p>
          <p>Name: <input name="name" value={newContact.name} onChange={editNewContact}/></p>
          <p>Email: <input name="email" value={newContact.email} onChange={editNewContact}/></p>
          <button onClick={addNewContact}>Add contact</button>
        </div>
        <ul>
          {store.contacts.map(contact => <li key={contact.name}>
            name: {contact.name}, email: {contact.email}
          </li>)}
        </ul>
      </div>
    )
  }

  editNewContact (ev) {
    const { newContact } = this.state
    const { name, value } = ev.target
    newContact[name] = value
  }

  addNewContact () {
    const { state } = this
    store.contacts.push(state.newContact)
    state.newContact = {}
  }
}
