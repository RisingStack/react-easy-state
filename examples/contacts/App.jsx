import React from 'react'
import ReactDOM from 'react-dom'
import { easyComp } from 'react-easy-state'
import Contact from './Contact'
import ContactCreator from './ContactCreator'
import store from './store'

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
          contact => <Contact contact={contact} key={contact.name} />
        )}
        <ContactCreator />
      </tbody>
    </table>
  )
}

const app = React.createElement(easyComp(App))
ReactDOM.render(app, document.getElementById('react-root'))
