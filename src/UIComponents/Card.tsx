import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {Component} from 'react';
import {useContextHOC} from '../Context/useContextHOC';
import {Theme} from '../Context/ThemeContext';

interface Props {
  context: Theme | null;
  style?: StyleProp<ViewStyle>;
}
class Card extends Component<Props> {
  render() {
    const {style} = this.props;
    const colors = this.props.context?.colors;
    const styles = StyleSheet.create({
      subContainer: {
        backgroundColor: colors?.themeColor.cardBackground,
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
    return (
      <View style={[styles.subContainer, style]}>{this.props.children}</View>
    );
  }
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useContextHOC(Card);
