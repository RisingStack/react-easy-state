import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import App from '../examples/contacts/App'

describe('Contacts App', () => {
  const app = mount(<App />)

  test('should add new contacts', async () => {
    expect(toJSON(app)).toMatchSnapshot('01. Initial state')

    const creator = app.find('.contact-creator')
    const nameField = creator.find('input[name="name"]')
    const emailField = creator.find('input[name="email"]')
    const createButton = creator.find('button')

    nameField.simulate('change', {
      target: { name: 'name', value: 'Test Contact' }
    })
    expect(toJSON(app)).toMatchSnapshot('02. Create Test Contact name')

    emailField.simulate('change', {
      target: { name: 'email', value: 'test.contact@gmail.com' }
    })
    expect(toJSON(app)).toMatchSnapshot('03. Create Test Contact email')

    createButton.simulate('click')
    expect(toJSON(app)).toMatchSnapshot('04. Add Test Contact')

    nameField.simulate('change', {
      target: { name: 'name', value: '' }
    })
    emailField.simulate('change', {
      target: { name: 'email', value: '' }
    })
    createButton.simulate('click')
    expect(toJSON(app)).toMatchSnapshot('05. Add Placeholder Contact')
  })

  test('should edit contact', async () => {
    let display,
      editor,
      editButton,
      cancelButton,
      saveButton,
      nameField,
      emailField

    display = app.find('.contact-display').at(0)
    editButton = display.find('.zmdi-edit')

    editButton.simulate('click')
    expect(toJSON(app)).toMatchSnapshot('06. Switch Test Contact to Edit Mode')

    editor = app.find('.contact-editor').at(0)
    nameField = editor.find('input[name="name"]')
    cancelButton = editor.find('.zmdi-close')

    nameField.simulate('change', {
      target: { name: 'name', value: 'Edited Test Contact' }
    })
    expect(toJSON(app)).toMatchSnapshot('07. Edit Test Contact name')

    cancelButton.simulate('click')
    expect(toJSON(app)).toMatchSnapshot('08. Cancel Test Contact edit')

    display = app.find('.contact-display').at(0)
    editButton = display.find('.zmdi-edit')

    editButton.simulate('click')
    expect(toJSON(app)).toMatchSnapshot('09. Switch Test Contact to edit Mode')

    editor = app.find('.contact-editor').at(0)
    emailField = editor.find('input[name="email"]')
    saveButton = editor.find('.zmdi-save')

    emailField.simulate('change', {
      target: { name: 'email', value: 'test.contact.edited@gmail.com' }
    })
    expect(toJSON(app)).toMatchSnapshot('10. Edit Test Contact email')

    saveButton.simulate('click')
    expect(toJSON(app)).toMatchSnapshot('11. Save Test Contact edit')
  })

  test('should delete contact', async () => {
    let deleteButton = app.find('.contact-display .zmdi-delete').at(1)

    deleteButton.simulate('click')
    expect(toJSON(app)).toMatchSnapshot('12. Delete Placeholder Contact')

    deleteButton = app.find('.contact-display .zmdi-delete').at(0)

    deleteButton.simulate('click')
    expect(toJSON(app)).toMatchSnapshot('13. Delete Test Contact')
  })
})
