import {StyleSheet, Text, SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomStatusBar from './CustomStatusBar';
import CustomButton from '../UIComponents/CustomButton';
import ThemeContext, {Theme} from '../Context/ThemeContext';
import {useContextHOC} from '../Context/useContextHOC';

interface Props {
  context: Theme | null;
  navigation: NavigationProp<ParamListBase>;
}

class Home extends Component<Props> {
  static contextType = ThemeContext;
  handleOnPress = async () => {
    try {
      await AsyncStorage.setItem('token', 'temp123');
      this.props.navigation.navigate('tabs');
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const colors = this.props.context?.colors;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors?.themeColor.background,
      },
      title: {
        color: colors?.themeColor.titleFont,
      },
    });
    return (
      <>
        <CustomStatusBar />
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Hello Welcome!</Text>
          <CustomButton onPress={this.handleOnPress} width="40%">
            Login
          </CustomButton>
        </SafeAreaView>
      </>
    );
  }
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useContextHOC(Home);
