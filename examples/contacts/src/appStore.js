import { store } from 'react-easy-state';

// store the central data and logic of the application in a global app store
export default store({
  contacts: [],
  addContact(contact) {
    contact.name = contact.name || 'Placeholder';
    contact.email = contact.email || 'Placeholder';
    this.contacts.push(contact);
  },
  deleteContact(contact) {
    const idx = this.contacts.indexOf(contact);
    this.contacts.splice(idx, 1);
  },
});
