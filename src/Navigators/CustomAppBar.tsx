import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomButton from '../UIComponents/CustomButton';

interface Props {
  style?: any;
  firstBtn?: {
    title: string;
    onPress: () => void;
    color?: string | undefined;
    backgroundColor?: string | undefined;
  };
  title: string;
  headerTitleStyle?: {color: string};
  lastBtn?: {
    title: string;
    onPress: () => void;
    color?: string | undefined;
    backgroundColor?: string | undefined;
  };
}
export default class AppBar extends Component<Props> {
  render() {
    const {title, firstBtn, headerTitleStyle, lastBtn, style} = this.props;
    console.log(lastBtn?.title);
    return (
      <>
        <CustomStatusBar
          backgroundColor={style ? style.backgroundColor : '#724E91'}
          barStyle="light-content"
        />
        <View style={{...styles.container, ...style}}>
          <View style={styles.subContainer}>
            {firstBtn && (
              <View style={styles.firstButtonView}>
                <CustomButton
                  backgroundColor={firstBtn.backgroundColor}
                  color={firstBtn.color}
                  onPress={firstBtn?.onPress}>
                  {firstBtn.title}
                </CustomButton>
              </View>
            )}
            <View style={styles.headerTitle}>
              <Text style={{...styles.headerTitleText, ...headerTitleStyle}}>
                {title}
              </Text>
            </View>
            {lastBtn && (
              <View style={styles.lastButtonView}>
                <CustomButton
                  backgroundColor={lastBtn.backgroundColor}
                  color={lastBtn.color}
                  onPress={lastBtn?.onPress}>
                  {lastBtn?.title}
                </CustomButton>
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
