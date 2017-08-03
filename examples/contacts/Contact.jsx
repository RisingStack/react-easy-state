import React, { Component } from 'react'
import { easyComp } from 'react-easy-state'
import store from './store'

class Contact extends Component {
  constructor ({ contact }) {
    super()

    // save internal utility data in component state, instead of the global store
    // editing is boolean meta flag, which indicates if the contact is currently edited
    // currentContact is a temporary state of the contact during editing, which can be saved or cancelled
    this.state = {
      currentContact: Object.assign({}, contact),
      editing: false
    }
  }

  onEdit () {
    this.state.editing = true
  }

  onDelete () {
    store.deleteContact(this.props.contact)
  }

  // transfer finalized changes from the component state to the main store
  onSave () {
    Object.assign(this.props.contact, this.state.currentContact)
    this.state.editing = false
  }

  // cancel changes by reverting to data from the main store
  onCancel () {
    Object.assign(this.state.currentContact, this.props.contact)
    this.state.editing = false
  }

  onChange (ev) {
    this.state.currentContact[ev.target.name] = ev.target.value
  }

  // render is triggered whenever the relevant parts of the component state, props or global store change
  render () {
    const { onChange, onSave, onCancel, onEdit, onDelete } = this
    const { currentContact, editing } = this.state
    const { contact } = this.props

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

// wrap the component with easyComp before exporting it
export default easyComp(Contact)
