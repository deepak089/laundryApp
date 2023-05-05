import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import Navigation from './navigation/Navigation';
import { store } from './redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}


