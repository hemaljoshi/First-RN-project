import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React, {Component} from 'react';
import {useContextHOC} from '../Context/useContextHOC';
import {Theme} from '../Context/ThemeContext';
interface Props {
  context: Theme | null;
  children?: React.ReactNode;
  buttonStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  buttonTextStyle?: StyleProp<ViewStyle>;
  color?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  width?: string | number;
}
class CustomButton extends Component<Props> {
  render() {
    const colors = this.props.context?.colors;
    const {buttonStyle, buttonTextStyle, onPress} = this.props;
    const styles = StyleSheet.create({
      buttonStyle: {
        borderRadius: 5,
        marginTop: 20,
        backgroundColor: colors?.themeColor.buttonPrimary,
        padding: 7,
        alignItems: 'center',
      },
      buttonTextStyle: {
        color: colors?.themeColor.buttonText,
        fontWeight: '600',
      },
    });
    const backgroundColor = {
      backgroundColor: this.props.backgroundColor
        ? this.props.backgroundColor
        : colors?.themeColor.buttonPrimary,
    };
    const color = {
      color: this.props.color
        ? this.props.color
        : colors?.themeColor.buttonText,
    };
    const width = {
      width: this.props.width ? this.props.width : '100%',
    };
    return (
      <TouchableOpacity
        style={[styles.buttonStyle, buttonStyle, backgroundColor, width]}
        onPress={onPress}>
        <Text style={[styles.buttonTextStyle, buttonTextStyle, color]}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useContextHOC(CustomButton);
