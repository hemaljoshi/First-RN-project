import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import AppBar from '../Navigators/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{params: {data: any}}, 'params'>;
}

let data: any = {};
export default class AsteroidInfo extends Component<Props> {
  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      this.props.navigation.navigate('login');
    } catch (e) {
      console.log(e);
    }
  };
  firstBtn = {
    title: 'Back',
    onPress: () => {
      this.props.navigation.goBack();
    },
  };
  render() {
    const {goBack} = this.props.navigation;
    data = this.props.route.params && this.props.route.params.data;
    return (
      <>
        <AppBar firstBtn={this.firstBtn} title="Asteroid Info" />
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.titleStyle}>Asteroid Data</Text>
            <Text style={styles.textStyle}>Name: {data?.name}</Text>
            <Text style={styles.textStyle}>
              Nasa JPL URL: {data?.nasa_jpl_url}
            </Text>
            <Text style={styles.textStyle}>
              Is potentially hazardous asteroid:{' '}
              {` ${data?.is_potentially_hazardous_asteroid}`}
            </Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => goBack()}>
              <Text style={styles.buttonTextStyle}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logouButtonStyle}
              onPress={this.handleLogout}>
              <Text style={styles.buttonTextStyle}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  subContainer: {
    backgroundColor: 'white',
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
  titleStyle: {
    fontSize: 28,
    marginBottom: 5,
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 5,
  },
  buttonStyle: {
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#4cb742',
    padding: 7,
    alignItems: 'center',
  },
  logouButtonStyle: {
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#ff2852',
    padding: 7,
    alignItems: 'center',
  },
  buttonTextStyle: {color: 'white', fontWeight: '600'},
});
