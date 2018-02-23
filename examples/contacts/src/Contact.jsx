import React, { Component } from 'react'
import { view, store } from 'react-easy-state'
import appStore from './appStore'

class Contact extends Component {
  constructor ({ contact }) {
    super()

    // save internal utility data in component store instead of the global store
    // editing is boolean meta flag, which indicates if the contact is currently edited
    // currentContact is a temporary state of the contact during editing, which can be saved or cancelled
    this.compStore = store({
      currentContact: Object.assign({}, contact),
      editing: false
    })
  }

  onEdit = () => {
    this.compStore.editing = true
  };

  onDelete = () => {
    appStore.deleteContact(this.props.contact)
  };

  // transfer finalized changes from the component store to the app store
  onSave = () => {
    // mutating the store with Object.assign is possible, but it is generally hard to reason about and debug
    Object.assign(this.props.contact, this.compStore.currentContact)
    this.compStore.editing = false
  };

  // cancel changes by reverting to data from the main store
  onCancel = () => {
    // mutating the store with Object.assign is possible, but it is generally hard to reason about and debug
    Object.assign(this.compStore.currentContact, this.props.contact)
    this.compStore.editing = false
  };

  onChange = ev => {
    this.compStore.currentContact[ev.target.name] = ev.target.value
  };

  // render is triggered whenever the relevant parts of the component store, app store or props change
  render () {
    const { onChange, onSave, onCancel, onEdit, onDelete } = this
    const { currentContact, editing } = this.compStore
    const { contact } = this.props

    if (!editing) {
      return (
        <tr className='contact-display'>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>
            <button onClick={onEdit}>
              <i className='zmdi zmdi-edit' />
            </button>
            <button onClick={onDelete}>
              <i className='zmdi zmdi-delete' />
            </button>
          </td>
        </tr>
      )
    }

    return (
      <tr className='contact-editor'>
        <td>
          <input
            name='name'
            value={currentContact.name}
            onChange={onChange}
            autoFocus
          />
        </td>
        <td>
          <input
            name='email'
            value={currentContact.email}
            onChange={onChange}
          />
        </td>
        <td>
          <button onClick={onSave}>
            <i className='zmdi zmdi-save' />
          </button>
          <button onClick={onCancel}>
            <i className='zmdi zmdi-close' />
          </button>
        </td>
      </tr>
    )
  }
}

// wrap the component with view() before exporting it
export default view(Contact)
