import React, { Component } from 'react'
import { easyComp } from 'react-easy-state'
import store from './store'

class Contact extends Component {
  constructor ({ contact }) {
    super()

    this.state = {
      contact,
      currentContact: Object.assign({}, contact),
      editing: false
    }
  }

  onEdit () {
    this.state.editing = true
  }

  onDelete () {
    const { contact } = this.props
    store.deleteContact(contact)
  }

  onSave () {
    const { contact, currentContact } = this.state
    Object.assign(contact, currentContact)
    this.state.editing = false
  }

  onCancel () {
    const { contact, currentContact } = this.state
    Object.assign(currentContact, contact)
    this.state.editing = false
  }

  onChange (ev) {
    const { currentContact } = this.state
    currentContact[ev.target.name] = ev.target.value
  }

  render () {
    const { onChange, onSave, onCancel, onEdit, onDelete } = this
    const { contact, currentContact, editing } = this.state

    if (!editing) {
      return (
        <tr>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>
            <button onClick={onEdit}><i className="zmdi zmdi-edit"></i></button>
            <button onClick={onDelete}><i className="zmdi zmdi-delete"></i></button>
          </td>
        </tr>
      )
    }

    return (
      <tr>
        <td><input name="name" value={currentContact.name} onChange={onChange} autoFocus={true}/></td>
        <td><input name="email" value={currentContact.email} onChange={onChange}/></td>
        <td>
          <button onClick={onSave}><i className="zmdi zmdi-save"></i></button>
          <button onClick={onCancel}><i className="zmdi zmdi-close"></i></button>
        </td>
      </tr>
    )
  }
}

export default easyComp(Contact)
