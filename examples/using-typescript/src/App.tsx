import React, { ChangeEvent } from 'react';
import { view as v, store as s } from 'react-easy-state';

const store = s({
  name: 'Peter',
  setNameEvent(ev: ChangeEvent<HTMLInputElement>) {
    if (ev.target) {
      this.name = ev.target.value;
    }
  },
});

// properly retain these props for the views
type AppProps = {
  greeting: string;
};

const App: React.FC<AppProps> = v(({ greeting, children }) => (
  <div>
    <h1>
      {greeting} {store.name}!
    </h1>
    <label htmlFor="name">Name:</label>
    <input
      id="name"
      value={store.name}
      onChange={store.setNameEvent.bind(store)}
    />
    {children}
  </div>
));

export default App;
