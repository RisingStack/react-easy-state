import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { easyComp } from 'react-easy-state'
import Profile from './Profile'
import ContactList from './ContactList'

@easyComp
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Profile</Link>
            <Link to="/contacts">Contacts</Link>
          </nav>

          <main>
            <Route exact path="/" component={Profile} />
            <Route path="/contacts" component={ContactList} />
          </main>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'))
