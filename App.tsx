import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './src/Navigators/BottomTabs';
import Splash from './src/Navigators/Splash';
// import Login from './src/Navigators/Login';
import {ThemeContextProvider} from './src/Context/ThemeContext';
import Home from './src/Components/Home';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="login" component={Home} />
          <Stack.Screen name="tabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default () => {
  return (
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  );
};
