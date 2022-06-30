/* eslint-disable @typescript-eslint/no-unused-vars */
import {Text, StyleSheet, View, Platform, Dimensions} from 'react-native';
import React, {Component} from 'react';
import ThemeContext, {Theme} from '../Context/ThemeContext';
import Card from '../UIComponents/Card';
import AppBar from '../Navigators/AppBar';
import Container from '../UIComponents/Container';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import CustomButton from '../UIComponents/CustomButton';
import MapView, {Marker, Region, LatLng} from 'react-native-maps';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

const {height, width} = Dimensions.get('window');

const API_KEY = '47fb832345ac4f1f9bcc28998ff8bca2';

interface State {
  latitude: number;
  longitude: number;
  address: string;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  // LatLng: LatLng;
}
export default class GetLocation extends Component<{}, State> {
  static contextType = ThemeContext;
  state: State = {
    latitude: 0,
    longitude: 0,
    address: '',
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
  async requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
        } else {
          console.log('location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    if (Platform.OS === 'ios') {
      try {
        const granted = await Geolocation.requestAuthorization('always');
        if (granted === 'granted') {
          console.log('You can use the location');
        } else {
          console.log('location permission ', granted);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  getCurrentLocation = () => {
    this.requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  getAddress = () => {
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${this.state.latitude}+${this.state.longitude}&key=${API_KEY}`,
      )
      .then((response: any) => {
        const res = response.data.results[0];
        this.setState({address: res.formatted});
      });
  };

  componentDidMount() {
    this.getCurrentLocation();
  }

  onRegionChange = (region: Region) => {
    this.setState({region: region});
  };

  zoomIn = () => {
    this.setState(prevValue => ({
      region: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: prevValue.region.latitudeDelta - 0.2,
        longitudeDelta: prevValue.region.longitudeDelta - 0.2,
      },
    }));
  };

  // zoomOut = () => {
  //   this.setState(prev => ({
  //     region: {
  //       latitude: this.state.latitude,
  //       longitude: this.state.longitude,
  //       latitudeDelta: prev.region.latitudeDelta + 0.5,
  //       longitudeDelta: prev.region.longitudeDelta + 0.5,
  //     },
  //   }));
  // };

  render() {
    const {colors} = this.context as Theme;
    const styles = StyleSheet.create({
      titleText: {color: colors.themeColor.primaryText, fontSize: 20},
      locationText: {color: colors.themeColor.primaryText, fontSize: 16},
      mapContainerStyle: {height: height - 430, width: '90%'},
      mapViewStyle: {height: '100%', width: '100%'},
      cardView: {height: height - 650, width: width - 40},
    });
    const {latitude, longitude, address} = this.state;

    return (
      <>
        <AppBar title="Get Location" />
        <Container>
          <Card>
            <Text style={styles.titleText}>Get Location</Text>
            <Text style={styles.locationText}>
              {latitude}, {longitude}
            </Text>
            <Text style={styles.locationText}>{address}</Text>
            <View>
              <CustomButton onPress={this.getAddress}>Get Address</CustomButton>
            </View>
            {/* <CustomButton onPress={this.zoomIn}>Zoom In</CustomButton> */}
            {/* <CustomButton onPress={this.zoomOut}>Zoom Out</CustomButton> */}
          </Card>
          <View style={styles.mapContainerStyle}>
            <MapView
              style={styles.mapViewStyle}
              region={this.state.region}
              onRegionChange={this.onRegionChange}>
              <Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
                title={'My Location'}
                description={this.state.address}
              />
            </MapView>
          </View>
        </Container>
      </>
    );
  }
}
