/* eslint-disable react-native/no-inline-styles */
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import Colors from '../Constants/Colors';
import AppBar from '../Navigators/AppBar';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {default as DatePickerIos} from 'react-native-datepicker';
import DatePicker from 'react-native-date-picker';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
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
    const {date, dob} = this.state;
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
                <Text>{dob}</Text>
              </View>
            )}
            <View style={styles.dateView}>
              <Text style={styles.titletext}>IOS & Android Both: </Text>
              <Text>{date.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: Colors.buttonPrimary,
    padding: 7,
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontFamily: 'Pacifico-Regular',
    color: Colors.buttonText,
    fontWeight: '500',
  },
  box: {
    marginTop: 10,
  },
  titletext: {
    fontFamily: 'DancingScript-Bold',
    color: Colors.primaryText,
    fontWeight: 'bold',
  },
  dateView: {
    padding: 10,
    backgroundColor: Colors.cardBackground,
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
});
