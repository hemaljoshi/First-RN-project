/* eslint-disable @typescript-eslint/no-unused-vars */
import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import AppBar from '../Navigators/AppBar';
import Container from '../UIComponents/Container';
import Card from '../UIComponents/Card';
// import {GiftedChat} from 'react-native-gifted-chat';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import ThemeContext, {Theme} from '../Context/ThemeContext';

interface State {
  messages: any[];
}
export default class Chat extends Component<{}, State> {
  static contextType = ThemeContext;
  state: State = {
    messages: [],
  };
  componentDidMount() {
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello there',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'PartyA',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ],
    // });
    // messaging()
    //   .getToken(firebase.app().options.messagingSenderId)
    //   .then(x => console.log(x))
    //   .catch(e => console.log(e));
  }
  // onSend = (messages: any[]) => {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }));
  // };
  render() {
    const {colors} = this.context as Theme;
    const {messages} = this.state;
    return (
      <>
        {/* <AppBar title="Let's chat" /> */}
        <Container>
          {/* <GiftedChat
            // backgroundColor={colors.themeColor.background}
            messages={messages}
            onSend={message => this.onSend(message)}
            user={{
              _id: 1,
            }}
          /> */}
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({});
