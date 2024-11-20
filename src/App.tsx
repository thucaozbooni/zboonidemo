import React from 'react';
import { AppProvider } from './contexts/AppContext';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <AppProvider>
      <AppNavigator />
    </AppProvider>
    </Provider>
  );
};

export default App;