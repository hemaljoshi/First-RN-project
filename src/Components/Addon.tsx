/* eslint-disable react-native/no-inline-styles */
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import AppBar from '../Navigators/AppBar';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {default as DatePickerIos} from 'react-native-datepicker';
import DatePicker from 'react-native-date-picker';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import ThemeContext, {Theme} from '../Context/ThemeContext';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}
interface State {
  date: Date;
  dob: string;
  mode: 'date' | 'time';
  show: boolean;
  showPicker: boolean;
}
export default class Addon extends Component<Props, State> {
  static contextType = ThemeContext;
  state: State = {
    date: new Date(1598051730000),
    dob: '2016-05-15',
    mode: 'date',
    show: false,
    showPicker: false,
  };
  firstBtn = {
    title: 'Back',
    onPress: () => {
      this.props.navigation.goBack();
    },
  };
  onChange = (event: DateTimePickerEvent, selectedDate: any) => {
    const currentDate = selectedDate;
    this.setState({
      date: currentDate,
    });
  };
  showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: this.state.date,
      onChange: this.onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  showDatepicker = () => {
    this.showMode('date');
  };
  showTimepicker = () => {
    this.showMode('time');
  };

  showDateTimepicker = () => {
    this.setState({
      showPicker: true,
    });
  };

  render() {
    const {colors} = this.context as Theme;
    const {date, dob} = this.state;
    const styles = StyleSheet.create({
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.themeColor.background,
      },
      buttonStyle: {
        width: '40%',
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: colors.themeColor.buttonPrimary,
        padding: 7,
        alignItems: 'center',
      },
      buttonTextStyle: {
        fontFamily: 'Pacifico-Regular',
        color: colors.themeColor.buttonText,
        fontWeight: '500',
      },
      box: {
        marginTop: 10,
      },
      titletext: {
        fontFamily: 'BaiJamjuree-Bold',
        color: colors.themeColor.primaryText,
      },
      dateView: {
        padding: 10,
        backgroundColor: colors.themeColor.cardBackground,
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4.65,
        elevation: 2,
      },
      text: {
        color: colors.themeColor.primaryText,
      },
    });
    return (
      <>
        <AppBar title="Addons" firstBtn={this.firstBtn} />
        <View style={styles.content}>
          {/* DateTime Picker for both plateform */}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.showDateTimepicker}>
            <Text style={styles.buttonTextStyle}>Date Time Picker</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={this.state.showPicker}
            date={date}
            mode="datetime"
            onConfirm={dates => {
              this.setState({
                showPicker: false,
                date: dates,
              });
            }}
            onCancel={() => {
              this.setState({
                showPicker: false,
              });
            }}
          />
          {/* DateTime Picker for ios plateform */}
          {Platform.OS === 'ios' && (
            <View style={styles.dateView}>
              <DatePickerIos
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  dateText: {
                    color: colors.themeColor.primaryText,
                  },
                }}
                onDateChange={dates => {
                  this.setState({dob: dates});
                }}
              />
            </View>
          )}
          {/* DateTime Picker for android plateform */}
          {Platform.OS === 'android' && (
            <>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.showDatepicker}>
                <Text style={styles.buttonTextStyle}>Date Picker</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.showTimepicker}>
                <Text style={styles.buttonTextStyle}>Time Picker</Text>
              </TouchableOpacity>
            </>
          )}
          <View style={styles.box}>
            {Platform.OS === 'ios' && (
              <View style={styles.dateView}>
                <Text style={styles.titletext}>IOS only:</Text>
                <Text style={styles.text}>{dob}</Text>
              </View>
            )}
            <View style={styles.dateView}>
              <Text style={styles.titletext}>IOS & Android Both: </Text>
              <Text style={styles.text}>{date.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </>
    );
  }
}
