import {StyleSheet, Text, SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomStatusBar from './CustomStatusBar';
import CustomButton from '../UIComponents/CustomButton';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

export default class Home extends Component<Props> {
  handleOnPress = async () => {
    try {
      await AsyncStorage.setItem('token', 'temp123');
      this.props.navigation.navigate('tabs');
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <>
        <CustomStatusBar />
        <SafeAreaView style={styles.container}>
          <Text>Hello Welcome!</Text>
          <CustomButton onPress={this.handleOnPress} width="40%">
            Login
          </CustomButton>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
