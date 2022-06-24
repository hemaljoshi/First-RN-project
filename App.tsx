import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Components/Home';
import BottomTabs from './src/Navigators/BottomTabs';
import Splash from './src/Navigators/Splash';

const Stack = createNativeStackNavigator();

export default class App extends Component {
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
