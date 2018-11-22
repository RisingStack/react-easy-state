import React, { StrictMode } from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import App from '../examples/contacts/src/App'

describe('Contacts App', () => {
  const { container } = render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  afterAll(cleanup)

  test('should add new contacts', () => {
    expect(container).toMatchSnapshot('01. Initial state')

    const nameField = container.querySelector('input[name="name"]')
    const emailField = container.querySelector('input[name="email"]')
    const createButton = container.querySelector('button')

    fireEvent.change(nameField, {
      target: { name: 'name', value: 'Test Contact' }
    })
    expect(container).toMatchSnapshot('02. Create Test Contact name')

    fireEvent.change(emailField, {
      target: { name: 'email', value: 'test.contact@gmail.com' }
    })
    expect(container).toMatchSnapshot('03. Create Test Contact email')

    fireEvent.click(createButton)
    expect(container).toMatchSnapshot('04. Add Test Contact')

    fireEvent.change(nameField, {
      target: { name: 'name', value: '' }
    })
    fireEvent.change(emailField, {
      target: { name: 'email', value: '' }
    })
    fireEvent.click(createButton)
    expect(container).toMatchSnapshot('05. Add Placeholder Contact')
  })

  test('should edit contact', () => {
    let display,
      editor,
      editButton,
      cancelButton,
      saveButton,
      nameField,
      emailField

    display = container.querySelector('.contact-display')
    editButton = display.querySelector('.zmdi-edit')

    fireEvent.click(editButton)
    expect(container).toMatchSnapshot('06. Switch Test Contact to Edit Mode')

    editor = container.querySelector('.contact-editor')
    nameField = editor.querySelector('input[name="name"]')
    cancelButton = editor.querySelector('.zmdi-close')

    fireEvent.change(nameField, {
      target: { name: 'name', value: 'Edited Test Contact' }
    })
    expect(container).toMatchSnapshot('07. Edit Test Contact name')

    fireEvent.click(cancelButton)
    expect(container).toMatchSnapshot('08. Cancel Test Contact edit')

    display = container.querySelector('.contact-display')
    editButton = display.querySelector('.zmdi-edit')

    fireEvent.click(editButton)
    expect(container).toMatchSnapshot('09. Switch Test Contact to edit Mode')

    editor = container.querySelector('.contact-editor')
    emailField = editor.querySelector('input[name="email"]')
    saveButton = editor.querySelector('.zmdi-save')

    fireEvent.change(emailField, {
      target: { name: 'email', value: 'test.contact.edited@gmail.com' }
    })
    expect(container).toMatchSnapshot('10. Edit Test Contact email')

    fireEvent.click(saveButton)
    expect(container).toMatchSnapshot('11. Save Test Contact edit')
  })

  test('should delete contact', () => {
    let deleteButton = container.querySelectorAll(
      '.contact-display .zmdi-delete'
    )[1]

    fireEvent.click(deleteButton)
    expect(container).toMatchSnapshot('12. Delete Placeholder Contact')

    deleteButton = container.querySelector('.contact-display .zmdi-delete')

    fireEvent.click(deleteButton)
    expect(container).toMatchSnapshot('13. Delete Test Contact')
  })
})
