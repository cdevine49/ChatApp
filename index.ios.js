
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

const firebase = require('./config.js');
import Main from './components/Main.js';
var AuthNavigator = require('./components/AuthNavigator.js');

class ChatApp extends Component {
  constructor() {
    super();
    this.state = {
      component: <AuthNavigator />
  };
  }

  componentDidMount() {
    this.authstatelistener = firebase.auth().onAuthStateChanged((authData) => {
      if (authData) {
        this.setState({ component: <Main /> });
      } else {
        this.setState({ component: <AuthNavigator /> });
      }
    });
  }

  componentWillUnmount() {
    this.authstatelistener();
  }


  render() {
    return (
      this.state.component
    );
  }
}

AppRegistry.registerComponent('ChatApp', () => ChatApp);
