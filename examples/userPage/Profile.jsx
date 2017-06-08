import React, { Component } from 'react'
import { easyComp } from 'react-easy-state'
import store from './store'

@easyComp
export default class Profile extends Component {
  state = {
    editing: false,
    newProfile: Object.assign({ name: '' }, store.user)
  }

  render() {
    const { editProfile, saveProfile, startEdit, cancelEdit } = this
    const { user } = store
    const { editing, newProfile } = this.state

    return (
      <div>
        {editing && <div>
          <p>Name: <input name="name" value={newProfile.name} onChange={editProfile}/></p>
          <p>Email: <input name="email" value={newProfile.mail} onChange={editProfile}/></p>
          <p>Phone: <input name="phone" value={newProfile.phone} onChange={editProfile}/></p>
          <button onClick={cancelEdit}>Cancel</button>
          <button onClick={saveProfile}>Save</button>
        </div>}

        {!editing && <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={startEdit}>Edit profile</button>
        </div>}
      </div>
    )
  }

  startEdit () {
    this.state.editing = true
  }

  cancelEdit () {
    this.state.newProfile = Object.assign({ name: '' }, store.user)
    this.state.editing = false
  }

  editProfile (ev) {
    const { newProfile } = this.state
    const { name, value } = ev.target
    newProfile[name] = value
  }

  saveProfile () {
    Object.assign(store.user, this.state.newProfile)
    this.state.editing = false
  }
}
