import React, { StrictMode } from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react/pure';
import App from '../examples/contacts/src/App';

describe('Contacts App', () => {
  const { container } = easyAct(() =>
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  );
  afterAll(cleanup);

  test('should add new contacts', () => {
    expect(container).toMatchSnapshot('01. Initial state');

    const nameField = container.querySelector('input[name="name"]');
    const emailField = container.querySelector('input[name="email"]');
    const createButton = container.querySelector('button');

    easyAct(() => {
      fireEvent.change(nameField, {
        target: { name: 'name', value: 'Test Contact' },
      });
    });
    expect(container).toMatchSnapshot('02. Create Test Contact name');

    easyAct(() => {
      fireEvent.change(emailField, {
        target: { name: 'email', value: 'test.contact@gmail.com' },
      });
    });
    expect(container).toMatchSnapshot(
      '03. Create Test Contact email',
    );

    easyAct(() => {
      fireEvent.click(createButton);
    });

    expect(container).toMatchSnapshot('04. Add Test Contact');

    easyAct(() => {
      fireEvent.change(nameField, {
        target: { name: 'name', value: '' },
      });
      fireEvent.change(emailField, {
        target: { name: 'email', value: '' },
      });
      fireEvent.click(createButton);
    });
    expect(container).toMatchSnapshot('05. Add Placeholder Contact');
  });

  test('should edit contact', () => {
    let display;
    let editor;
    let editButton;

    display = container.querySelector('.contact-display');
    editButton = display.querySelector('.zmdi-edit');

    easyAct(() => {
      fireEvent.click(editButton);
    });
    expect(container).toMatchSnapshot(
      '06. Switch Test Contact to Edit Mode',
    );

    editor = container.querySelector('.contact-editor');
    const nameField = editor.querySelector('input[name="name"]');
    const cancelButton = editor.querySelector('.zmdi-close');

    easyAct(() => {
      fireEvent.change(nameField, {
        target: { name: 'name', value: 'Edited Test Contact' },
      });
    });
    expect(container).toMatchSnapshot('07. Edit Test Contact name');

    easyAct(() => {
      fireEvent.click(cancelButton);
    });
    expect(container).toMatchSnapshot('08. Cancel Test Contact edit');

    display = container.querySelector('.contact-display');
    editButton = display.querySelector('.zmdi-edit');

    easyAct(() => {
      fireEvent.click(editButton);
    });
    expect(container).toMatchSnapshot(
      '09. Switch Test Contact to edit Mode',
    );

    editor = container.querySelector('.contact-editor');
    const emailField = editor.querySelector('input[name="email"]');
    const saveButton = editor.querySelector('.zmdi-save');

    easyAct(() => {
      fireEvent.change(emailField, {
        target: {
          name: 'email',
          value: 'test.contact.edited@gmail.com',
        },
      });
    });
    expect(container).toMatchSnapshot('10. Edit Test Contact email');

    easyAct(() => {
      fireEvent.click(saveButton);
    });
    expect(container).toMatchSnapshot('11. Save Test Contact edit');
  });

  test('should delete contact', () => {
    let deleteButton = container.querySelectorAll(
      '.contact-display .zmdi-delete',
    )[1];

    easyAct(() => {
      fireEvent.click(deleteButton);
    });
    expect(container).toMatchSnapshot(
      '12. Delete Placeholder Contact',
    );

    deleteButton = container.querySelector(
      '.contact-display .zmdi-delete',
    );

    easyAct(() => {
      fireEvent.click(deleteButton);
    });
    expect(container).toMatchSnapshot('13. Delete Test Contact');
  });
});
