import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React, {Component} from 'react';
import Colors from '../Constants/Colors';
interface Props {
  children?: React.ReactNode;
  buttonStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  buttonTextStyle?: StyleProp<ViewStyle>;
  color?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  width?: string | number;
}
export default class CustomButton extends Component<Props> {
  backgroundColor = {
    backgroundColor: this.props.backgroundColor
      ? this.props.backgroundColor
      : Colors.buttonPrimary,
  };
  color = {
    color: this.props.color ? this.props.color : Colors.buttonText,
  };
  width = {
    width: this.props.width ? this.props.width : '100%',
  };
  render() {
    const {buttonStyle, buttonTextStyle, onPress} = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          buttonStyle,
          this.backgroundColor,
          this.width,
        ]}
        onPress={onPress}>
        <Text style={[styles.buttonTextStyle, buttonTextStyle, this.color]}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: Colors.buttonPrimary,
    padding: 7,
    alignItems: 'center',
  },
  buttonTextStyle: {color: Colors.buttonText, fontWeight: '600'},
});
