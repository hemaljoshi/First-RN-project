import {StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomStatusBar from './CustomStatusBar';

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
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.handleOnPress}>
            <Text style={styles.buttonTextStyle}>Login</Text>
          </TouchableOpacity>
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
  buttonStyle: {
    width: '50%',
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#4cb742',
    padding: 7,
    alignItems: 'center',
  },
  buttonTextStyle: {color: 'white', fontWeight: '600'},
});
