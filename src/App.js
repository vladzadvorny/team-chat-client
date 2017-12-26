import React from 'react';
import { ApolloProvider } from 'react-apollo';

import Routes from './routes';
import client from './apollo';

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
