import React, { Component } from 'react'
import { easyComp } from 'react-easy-state'
import store from './store'

class Contact extends Component {
  constructor ({ contact }) {
    super()

    // save internal utility data in component store instead of the global store
    // editing is boolean meta flag, which indicates if the contact is currently edited
    // currentContact is a temporary state of the contact during editing, which can be saved or cancelled
    this.store = {
      currentContact: Object.assign({}, contact),
      editing: false
    }
  }

  onEdit () {
    this.store.editing = true
  }

  onDelete () {
    store.deleteContact(this.props.contact)
  }

  // transfer finalized changes from the component store to the main store
  onSave () {
    // mutating the store with Object.assign is possible, but it is generally hard to reason about and debug
    Object.assign(this.props.contact, this.store.currentContact)
    this.store.editing = false
  }

  // cancel changes by reverting to data from the main store
  onCancel () {
    // mutating the store with Object.assign is possible, but it is generally hard to reason about and debug
    Object.assign(this.store.currentContact, this.props.contact)
    this.store.editing = false
  }

  onChange (ev) {
    this.store.currentContact[ev.target.name] = ev.target.value
  }

  // render is triggered whenever the relevant parts of the component store, props or global store change
  render () {
    const { onChange, onSave, onCancel, onEdit, onDelete } = this
    const { currentContact, editing } = this.store
    const { contact } = this.props

    if (!editing) {
      return (
        <tr className='contact-display'>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>
            <button onClick={onEdit}><i className='zmdi zmdi-edit' /></button>
            <button onClick={onDelete}><i className='zmdi zmdi-delete' /></button>
          </td>
        </tr>
      )
    }

    return (
      <tr className='contact-editor'>
        <td><input name='name' value={currentContact.name} onChange={onChange} autoFocus /></td>
        <td><input name='email' value={currentContact.email} onChange={onChange} /></td>
        <td>
          <button onClick={onSave}><i className='zmdi zmdi-save' /></button>
          <button onClick={onCancel}><i className='zmdi zmdi-close' /></button>
        </td>
      </tr>
    )
  }
}

// wrap the component with easyComp before exporting it
export default easyComp(Contact)
