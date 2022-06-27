import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {Component} from 'react';
import Home from '../Components/Home';
import {ThemeContextProvider} from '../Context/ThemeContext';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}
export default class Login extends Component<Props> {
  render() {
    return (
      <ThemeContextProvider>
        <Home navigation={this.props.navigation} />
      </ThemeContextProvider>
    );
  }
}
