
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Keyboard,
  Platform
} from 'react-native';

const firebase = require('./config.js');
import Main from './components/Main.js';
var AuthNavigator = require('./components/AuthNavigator.js');

class ChatApp extends Component {
  constructor() {
    super();
    this.state = {
      keyboardHeight: 258,
      component: <AuthNavigator />
    };

    this.updateKeyboardHeight = this.updateKeyboardHeight.bind(this);
  }

  getChildContext() {
    return {keyboardHeight: this.state.keyboardHeight};
  }

  componentDidMount() {
    this.authstatelistener = firebase.auth().onAuthStateChanged((authData) => {
      if (authData) {
        this.setState({ component: <Main /> });
      } else {
        this.setState({ component: <AuthNavigator /> });
      }
    });

    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    this.keyboardListener = Keyboard.addListener(updateListener, this.updateKeyboardHeight);
  }

  componentWillUnmount() {
    this.authstatelistener();
    this.keyboardListener.remove();
  }

  updateKeyboardHeight(frames, evt) {
    const newHeight = frames.endCoordinates.height;

    if (this.state.keyboardHeight !== newHeight) {
      this.setState({keyboardHeight: newHeight});
    }
  }

  render() {
    return (
      this.state.component
    );
  }
}

ChatApp.childContextTypes = {
  keyboardHeight: React.PropTypes.number
};

AppRegistry.registerComponent('Chatter', () => ChatApp);
