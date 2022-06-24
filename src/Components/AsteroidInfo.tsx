import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import AppBar from '../Navigators/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Constants/Colors';
import Card from '../UIComponents/Card';
import CustomButton from '../UIComponents/CustomButton';

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
          <Card>
            <Text style={styles.titleStyle}>Asteroid Data</Text>
            <Text style={styles.textStyle}>Name: {data?.name}</Text>
            <Text style={styles.textStyle}>
              Nasa JPL URL: {data?.nasa_jpl_url}
            </Text>
            <Text style={styles.textStyle}>
              Is potentially hazardous asteroid:{' '}
              {` ${data?.is_potentially_hazardous_asteroid}`}
            </Text>
            <View>
              <CustomButton
                backgroundColor={Colors.success}
                onPress={() => goBack()}>
                Go Back
              </CustomButton>
              <CustomButton
                onPress={this.handleLogout}
                backgroundColor={Colors.danger}>
                Logout
              </CustomButton>
            </View>
          </Card>
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
    backgroundColor: Colors.cardBackground,
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
  logouButtonStyle: {
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: Colors.danger,
    padding: 7,
    alignItems: 'center',
  },
});
