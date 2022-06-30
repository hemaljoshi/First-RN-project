import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {Component} from 'react';
import ThemeContext, {Theme} from '../Context/ThemeContext';

interface Props {
  style?: StyleProp<ViewStyle>;
}
export default class Container extends Component<Props> {
  static contextType = ThemeContext;
  render() {
    const {style} = this.props;
    const {colors} = this.context as Theme;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors?.themeColor.background,
      },
    });
    return <View style={[styles.container, style]}>{this.props.children}</View>;
  }
}
