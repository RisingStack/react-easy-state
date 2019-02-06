import React, { Component } from 'react'
import { act } from 'react-dom/test-utils'
import { render, cleanup } from 'react-testing-library'
import { view, store } from 'react-easy-state'
import { withTheme, ThemeProvider } from 'styled-components'

describe('withRouter interaction', () => {
  const theme = { color: 'red' }
  const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )

  afterEach(() => {
    cleanup()
  })

  describe('function components', () => {
    test('should be reactive with withTheme(view(Comp))', () => {
      const counter = store({ num: 0 })
      const MyComp = withTheme(view(() => <div>{counter.num}</div>))

      const { container } = render(
        <Theme>
          <MyComp />
        </Theme>
      )
      expect(container).toHaveTextContent('0')
      act(() => {
        counter.num++
      })
      expect(container).toHaveTextContent('1')
    })

    test('should properly inject theme with withTheme(view(Comp))', () => {
      const MyComp = withTheme(
        view(({ theme }) => <p style={{ color: theme.color }}>Hello</p>)
      )

      const { container } = render(
        <Theme>
          <MyComp />
        </Theme>
      )
      expect(container.querySelector('p')).toHaveStyle('color: red;')
    })
  })

  describe('class components', () => {
    test('should be reactive with withTheme(view(Comp))', () => {
      const counter = store({ num: 0 })
      const MyComp = withTheme(
        view(
          class MyComp extends Component {
            render () {
              return <div>{counter.num}</div>
            }
          }
        )
      )

      const { container } = render(
        <Theme>
          <MyComp />
        </Theme>
      )
      expect(container).toHaveTextContent('0')
      act(() => {
        counter.num++
      })
      expect(container).toHaveTextContent('1')
    })

    test('should properly route with withRouter(view(Comp))', () => {
      const MyComp = withTheme(
        view(
          class MyComp extends Component {
            render () {
              return <p style={{ color: theme.color }}>Hello</p>
            }
          }
        )
      )

      const { container } = render(
        <Theme>
          <MyComp />
        </Theme>
      )
      expect(container.querySelector('p')).toHaveStyle('color: red;')
    })
  })
})
