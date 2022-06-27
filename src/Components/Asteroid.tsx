import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import axios from 'axios';
import AppBar from '../Navigators/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Constants/Colors';
import CustomButton from '../UIComponents/CustomButton';
import ThemeContext, {Theme} from '../Context/ThemeContext';

const apiKey = '6QaguSak47jKcQTU26GBRVVBxYwcVsYirSKM7Erq';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}
interface State {
  asteroidID: string;
  loading: boolean;
}

export default class Asteroid extends Component<Props, State> {
  static contextType = ThemeContext;
  constructor(props: Props) {
    super(props);
    this.state = {
      asteroidID: '',
      loading: false,
    };
  }
  handleonChangeAsteroidId = (text: string) => {
    this.setState({
      asteroidID: text,
    });
  };

  onClickRandom = () => {
    this.setState({
      loading: true,
    });
    axios
      .get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')
      .then(res => {
        const asteroidData = res?.data?.near_earth_objects;
        const random = Math.floor(Math.random() * asteroidData?.length);
        this.setState({
          asteroidID: asteroidData[random].id,
          loading: false,
        });
      })
      .catch(err => {
        Alert.alert(err);
        this.setState({
          loading: false,
        });
      });
  };

  handleSubmit = () => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/${this.state.asteroidID}?api_key=${apiKey}`,
      )
      .then(res => {
        const data: any = res.data;
        this.props.navigation.navigate('Info', {data: data});
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        Alert.alert('Error Occured', `${err}`, [{text: 'Okay'}]);
        this.setState({
          asteroidID: '',
          loading: false,
        });
      });
  };

  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      this.props.navigation.navigate('login');
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({
        asteroidID: '',
      });
    });
  }

  firstBtn = {
    title: 'Back',
    onPress: () => {
      this.props.navigation.goBack();
    },
  };
  lastBtn = {
    title: 'Logout',
    onPress: this.handleLogout,
    backgroundColor: Colors.danger,
  };

  render() {
    const {colors, toogleTheme} = this.context as Theme;
    const {loading, asteroidID} = this.state;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.themeColor.background,
      },
      appbar: {
        backgroundColor: colors.themeColor.secondary,
      },
      subContainer: {
        backgroundColor: colors.themeColor.cardBackground,
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
      titleText: {
        color: colors.themeColor.primaryText,
        fontSize: 28,
        marginBottom: 5,
      },
      textInputStyle: {
        padding: 10,
        height: 40,
        borderColor: colors.themeColor.inputBorder,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
      },
      randomButtonStyle: {
        backgroundColor: colors.themeColor.buttonSecondary,
      },
    });
    return (
      <>
        <AppBar
          firstBtn={this.firstBtn}
          title="Asteroid"
          lastBtn={this.lastBtn}
          style={styles.appbar}
        />
        <View style={styles.container}>
          {loading ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View style={styles.subContainer}>
              <Text style={styles.titleText}>Search Asteroid Data</Text>
              <TextInput
                value={asteroidID}
                style={styles.textInputStyle}
                onChangeText={this.handleonChangeAsteroidId}
              />
              <View>
                <CustomButton
                  onPress={this.onClickRandom}
                  backgroundColor={colors.themeColor.buttonSecondary}
                  color={colors.themeColor.buttonText}>
                  Random
                </CustomButton>
                <CustomButton onPress={this.handleSubmit}>Submit</CustomButton>
                <CustomButton onPress={toogleTheme}>Toogle Theme</CustomButton>
              </View>
            </View>
          )}
        </View>
      </>
    );
  }
}
