import React, { Component } from 'react'
import { act } from 'react-dom/test-utils'
import { render, cleanup, fireEvent } from 'react-testing-library'
import { view, store } from 'react-easy-state'
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

describe('withRouter interaction', () => {
  afterEach(() => {
    cleanup()
    window.history.replaceState({}, '', '/')
  })

  describe('function components', () => {
    test('should be reactive with withRouter(view(Comp))', () => {
      const counter = store({ num: 0 })
      const MyComp = withRouter(view(() => <div>{counter.num}</div>))

      const { container } = render(
        <Router>
          <MyComp />
        </Router>
      )
      expect(container).toHaveTextContent('0')
      act(() => {
        counter.num++
      })
      expect(container).toHaveTextContent('1')
    })

    test('should properly route with withRouter(view(Comp))', () => {
      const MyComp = withRouter(
        view(() => (
          <div>
            <Link to='/settings'>To Settings</Link>
            <Route path='/settings' render={() => <p>Settings</p>} />
          </div>
        ))
      )

      const { container, getByText } = render(
        <Router>
          <MyComp />
        </Router>
      )

      expect(container.querySelector('p')).toBe(null)
      fireEvent.click(getByText('To Settings'))
      expect(container.querySelector('p')).toHaveTextContent('Settings')
    })
  })

  describe('class components', () => {
    test('should be reactive with withRouter(view(Comp))', () => {
      const counter = store({ num: 0 })
      const MyComp = withRouter(
        view(
          class MyComp extends Component {
            render () {
              return <div>{counter.num}</div>
            }
          }
        )
      )

      const { container } = render(
        <Router>
          <MyComp />
        </Router>
      )
      expect(container).toHaveTextContent('0')
      act(() => {
        counter.num++
      })
      expect(container).toHaveTextContent('1')
    })

    test('should properly route with withRouter(view(Comp))', () => {
      const MyComp = withRouter(
        view(
          class MyComp extends Component {
            render () {
              return (
                <div>
                  <Link to='/settings'>To Settings</Link>
                  <Route path='/settings' render={() => <p>Settings</p>} />
                </div>
              )
            }
          }
        )
      )

      const { container, getByText } = render(
        <Router>
          <MyComp />
        </Router>
      )

      expect(container.querySelector('p')).toBe(null)
      fireEvent.click(getByText('To Settings'))
      expect(container.querySelector('p')).toHaveTextContent('Settings')
    })
  })
})
