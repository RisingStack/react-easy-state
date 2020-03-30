import {
  store,
  autoEffect,
  clearEffect,
  configure,
} from '@risingstack/react-easy-state';

describe('strict mode', () => {
  test('should allow observed property mutation outside store methods in normal mode', () => {
    let name = '';

    const user = store({ name: 'Bob' });
    const effect = autoEffect(() => (name = user.name));

    expect(() => (user.name = 'Ann')).not.toThrow();

    clearEffect(effect);
  });

  test('should not allow observed property mutation outside store methods in strict mode', () => {
    configure({ strictMode: true });
    let name = '';

    const user = store({ name: 'Bob' });
    const effect = autoEffect(() => (name = user.name));

    expect(() => (user.name = 'Ann')).toThrow(
      'You can not set store properties outside store methods in strict mode',
    );

    clearEffect(effect);
    configure({ strictMode: false });
  });

  test('should allow not observed property mutation outside store methods in strict mode', () => {
    configure({ strictMode: true });

    const user = store({ name: 'Bob' });

    expect(() => (user.name = 'Ann')).not.toThrow();
    configure({ strictMode: false });
  });

  test('should allow observed property mutation inside store methods in strict mode', () => {
    configure({ strictMode: true });
    let name = '';

    const user = store({
      name: 'Bob',
      setName(newName) {
        user.name = newName;
      },
    });
    const effect = autoEffect(() => (name = user.name));

    expect(() => user.setName('Ann')).not.toThrow();

    clearEffect(effect);
    configure({ strictMode: false });
  });

  /* test('should allow observed property mutation inside store setters in strict mode', () => {
    configure({ strictMode: true });

    const user = store({
      firstName: 'Bob',
      lastName: 'Smith',
      set name(newName) {
        const [firstName, lastName] = newName.split(' ');
        user.firstName = firstName;
        user.lastName = lastName;
      },
    });
    const effect = autoEffect(() => (name = user.name));

    expect(() => (user.name = 'Ann')).not.toThrow();

    clearEffect(effect);
    configure({ strictMode: false });
  }); */

  /* test('should not care about strict mode in prod builds', () => {
    const nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    configure({ strictMode: true });

    const user = store({ name: 'Bob' });
    const effect = autoEffect(() => (name = user.name));

    expect(() => (user.name = 'Ann')).not.toThrow();

    process.env.NODE_ENV = nodeEnv;
    clearEffect(effect);
    configure({ strictMode: false });
  }); */
});
