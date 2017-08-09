import React from 'react'
import { easyComp } from 'react-easy-state'
import Contact from './Contact'
import ContactCreator from './ContactCreator'
import store from './store'

// this rerenders whenever the store.contacts array changes (elements pushed or deleted)
function App () {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {store.contacts.map(
          contact => <Contact contact={contact} key={contact.email} />
        )}
        <ContactCreator />
      </tbody>
    </table>
  )
}

// wrap the component with easyComp before exporting it
export default easyComp(App)
