import React from 'react';
import { render } from 'react-dom';
import WatchAddress from '../../src';
const App = () => (
  <WatchAddress
    address="bitcoincash:qrv8w60f40yjhqzfswyc39n78anxjhcx75ppt2df5c"
    text="You have deposited"
    callbackPath="/api/example"
  />
);
render(<App />, document.getElementById('root'));
