import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';

interface Props {
  style?: any;
  firstBtn?: {
    title: string;
    onPress: () => void;
    color?: {color?: string};
    backgroundColor?: {backgroundColor?: string};
  };
  title: string;
  headerTitleStyle?: {color: string};
  lastBtn?: {
    title: string;
    onPress: () => void;
    color?: {color?: string};
    backgroundColor?: {backgroundColor?: string};
  };
}
export default class AppBar extends Component<Props> {
  render() {
    const {title, firstBtn, headerTitleStyle, lastBtn, style} = this.props;
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
                  style={[
                    styles.buttonStyle,
                    firstBtn?.backgroundColor && firstBtn.backgroundColor,
                  ]}
                  onPress={firstBtn?.onPress}>
                  <Text
                    style={[
                      styles.buttonTextStyle,
                      firstBtn?.color && firstBtn.color,
                    ]}>
                    {firstBtn?.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.headerTitle}>
              <Text
                style={[
                  styles.headerTitleText,
                  headerTitleStyle && headerTitleStyle,
                ]}>
                {title}
              </Text>
            </View>
            {lastBtn && (
              <View style={styles.lastButtonView}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    lastBtn?.backgroundColor && lastBtn.backgroundColor,
                  ]}
                  onPress={lastBtn?.onPress}>
                  <Text
                    style={[
                      styles.buttonTextStyle,
                      lastBtn?.color && lastBtn.color,
                    ]}>
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
  headerTitle: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
