import {createContext} from 'react';

export interface Theme {
  theme: string;
  toogleTheme: () => void;
  colors: {
    themeColor: {
      background: string;
      primary: string;
      secondary: string;
      success: string;
      danger: string;
      cardBackground: string;
      inputBorder: string;
      titleFont: string;
      buttonText: string;
      buttonPrimary: string;
      buttonSecondary: string;
      primaryText: string;
      lightText: string;
      darkText: string;
    };
  };
}
const ThemeContext = createContext<Theme | null>(null);

interface ThemeContextProviderProps {
  children: React.ReactNode;
}
interface ThemeContextState {
  theme: 'light' | 'dark';
}

import React, {Component} from 'react';

export class ThemeContextProvider extends Component<
  ThemeContextProviderProps,
  ThemeContextState
> {
  state: ThemeContextState = {
    theme: 'dark',
  };
  toogleTheme = () => {
    if (this.state.theme === 'light') {
      this.setState({theme: 'dark'});
    } else {
      this.setState({theme: 'light'});
    }
  };
  render() {
    const colors = {
      themeColor: this.state.theme === 'light' ? lightColors : darkColors,
    };
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          toogleTheme: this.toogleTheme,
          colors,
        }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContext;

export const lightColors = {
  background: '#fff',
  primary: '#724E91',
  secondary: '#415A77',
  success: '#4cb742',
  danger: '#ff2852',
  cardBackground: '#fff',
  inputBorder: '#808080',
  titleFont: '#fff',
  buttonText: '#fff',
  darkText: '#09224A',
  lightText: '#fff',
  buttonPrimary: '#8887ff',
  buttonSecondary: '#808F85',
  primaryText: '#808080',
};

export const darkColors = {
  background: '#19232e',
  primary: '#46B6DF',
  secondary: '#3a9991',
  success: '#4cb742',
  danger: '#ff2852',
  cardBackground: '#22303f',
  inputBorder: '#808080',
  titleFont: '#fff',
  buttonText: '#09224A',
  darkText: '#09224A',
  lightText: '#fff',
  buttonPrimary: '#87c2ff',
  buttonSecondary: '#91C499',
  primaryText: '#e5e5e5',
};
