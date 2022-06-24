import {Alert, Image, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}
export default class Splash extends Component<Props> {
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log(value);
      if (value !== null) {
        this.props.navigation.navigate('tabs');
      } else {
        this.props.navigation.navigate('login');
      }
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setTimeout(() => {
        if (state.isConnected) {
          this.getData();
        } else {
          Alert.alert('No Internet');
        }
      }, 3000);
    });
  }
  render() {
    return (
      <View>
        <Image
          source={require('../../assets/splash.png')}
          style={styles.imageStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {width: '100%', height: '100%'},
});
