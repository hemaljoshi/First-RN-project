import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {Component} from 'react';
import Colors from '../Constants/Colors';

interface Props {
  style?: StyleProp<ViewStyle>;
}
export default class Card extends Component<Props> {
  render() {
    const {style} = this.props;
    return (
      <View style={[styles.subContainer, style]}>{this.props.children}</View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: Colors.cardBackground,
    padding: 38,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
