import React, { Component } from 'react'
import { view, store } from 'react-easy-state'
import appStore from './appStore'

class ContactCreator extends Component {
  // save internal utility data in component store, instead of the app store
  // newContact is the skeleton for the next contact before it is added to the list
  compStore = store({
    newContact: { name: '', email: '' }
  });

  // transfer finalized contact from the component store to the app store
  addContact = () => {
    appStore.addContact(this.compStore.newContact)
    this.compStore.newContact = { name: '', email: '' }
  };

  onChange = ev => {
    const { newContact } = this.compStore
    newContact[ev.target.name] = ev.target.value
  };

  // render is triggered whenever the relevant parts of the component store or app store change
  render () {
    const { addContact, onChange } = this
    const { newContact } = this.compStore

    return (
      <tr className='contact-creator'>
        <td>
          <input
            name='name'
            value={newContact.name}
            onChange={onChange}
            placeholder='Contact name...'
          />
        </td>
        <td>
          <input
            name='email'
            value={newContact.email}
            onChange={onChange}
            placeholder='Contact email...'
          />
        </td>
        <td>
          <button onClick={addContact}>Add Contact</button>
        </td>
      </tr>
    )
  }
}

// wrap the component with view() before exporting it
export default view(ContactCreator)
