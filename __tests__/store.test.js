// eslint-disable-next-line import/no-unresolved
import { store, autoEffect, clearEffect } from 'react-easy-state';

describe('Store method behavior', () => {
  test('should auto bind store methods', () => {
    const myStore = store({
      name: 'My Store',
      setName(newName) {
        this.name = newName;
      },
    });

    const nameSetter = myStore.setName;
    nameSetter('Awesome Store');
    expect(myStore.name).toBe('Awesome Store');
  });

  test('should not try to bind getters/setters (they are always bound)', () => {
    const myStore = store({
      firstName: 'My',
      lastName: 'Store',
      get name() {
        return `${this.firstName} ${this.lastName}`;
      },
    });

    expect(myStore.name).toBe('My Store');
    myStore.firstName = 'Awesome';
    expect(myStore.name).toBe('Awesome Store');
  });

  test('should auto batch store methods', () => {
    let numOfRuns = 0;
    let name = '';

    const myStore = store({
      firstName: 'My',
      lastName: 'Store',
      setName(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      },
    });

    const effect = autoEffect(() => {
      name = `${myStore.firstName} ${myStore.lastName}`;
      numOfRuns += 1;
    });
    expect(name).toBe('My Store');
    expect(numOfRuns).toBe(1);

    myStore.setName('Awesome', 'Stuff');
    expect(name).toBe('Awesome Stuff');
    expect(numOfRuns).toBe(2);

    clearEffect(effect);
  });

  test('should auto batch getters/setters', () => {
    let numOfRuns = 0;
    let name = '';

    const myStore = store({
      firstName: 'My',
      lastName: 'Store',
      get name() {
        return `${this.firstName} ${this.lastName}`;
      },
      set name(newName) {
        const [firstName, lastName] = newName.split(' ');
        this.firstName = firstName;
        this.lastName = lastName;
      },
    });

    const effect = autoEffect(() => {
      name = myStore.name;
      numOfRuns += 1;
    });
    expect(name).toBe('My Store');
    expect(numOfRuns).toBe(1);

    myStore.name = 'Awesome Stuff';
    expect(name).toBe('Awesome Stuff');
    expect(numOfRuns).toBe(2);

    clearEffect(effect);
  });

  test('should keep method names', () => {
    const myStore = store({
      name: 'My Store',
      setName(newName) {
        this.name = newName;
      },
    });

    expect(myStore.setName.name).toBe('setName');
  });
});
