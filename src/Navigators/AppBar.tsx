import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {Component} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Colors from '../Constants/Colors';

interface Props {
  style?: any;
  firstBtn?: {
    title: string;
    onPress: () => void;
    color?: string;
    backgroundColor?: string;
  };
  title: string;
  headerTitleStyle?: StyleProp<ViewStyle>;
  headerTitleColor?: string;
  lastBtn?: {
    title: string;
    onPress: () => void;
    color?: string;
    backgroundColor?: string;
  };
}
export default class AppBar extends Component<Props> {
  firstBtnbackgroundColor = {
    backgroundColor: this.props.firstBtn?.backgroundColor
      ? this.props.firstBtn?.backgroundColor
      : Colors.buttonPrimary,
  };
  lastBtnbackgroundColor = {
    backgroundColor: this.props.lastBtn?.backgroundColor
      ? this.props.lastBtn?.backgroundColor
      : Colors.buttonPrimary,
  };
  lastBtnColor = {
    color: this.props.lastBtn?.color
      ? this.props.lastBtn?.color
      : Colors.buttonText,
  };
  firstBtnColor = {
    color: this.props.lastBtn?.color
      ? this.props.lastBtn?.color
      : Colors.buttonText,
  };
  headerTitleColor = {
    color: this.props.headerTitleColor ? this.props.headerTitleColor : 'white',
  };
  render() {
    const {title, firstBtn, headerTitleStyle, lastBtn, style} = this.props;
    const dynamicStyles = StyleSheet.create({
      headerTitle: {
        width: firstBtn ? '40%' : '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
      },
    });
    return (
      <>
        <CustomStatusBar
          backgroundColor={style ? style.backgroundColor : '#724E91'}
          barStyle="light-content"
        />
        <View style={[styles.container, style && style]}>
          <View style={styles.subContainer}>
            {firstBtn && (
              <View style={styles.firstButtonView}>
                <TouchableOpacity
                  style={[styles.buttonStyle, this.firstBtnbackgroundColor]}
                  onPress={firstBtn?.onPress}>
                  <Text style={[styles.buttonTextStyle, this.firstBtnColor]}>
                    {firstBtn?.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={dynamicStyles.headerTitle}>
              <Text
                style={[
                  styles.headerTitleText,
                  headerTitleStyle,
                  this.headerTitleColor,
                ]}>
                {title}
              </Text>
            </View>
            {lastBtn && (
              <View style={styles.lastButtonView}>
                <TouchableOpacity
                  style={[styles.buttonStyle, this.lastBtnbackgroundColor]}
                  onPress={lastBtn?.onPress}>
                  <Text style={[styles.buttonTextStyle, this.lastBtnColor]}>
                    {lastBtn?.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#724E91',
    height: 70,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  subContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  firstButtonView: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  lastButtonView: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: '#8887ff',
    padding: 7,
    alignItems: 'center',
  },
  buttonTextStyle: {color: 'white', fontWeight: '600'},
  headerTitleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
