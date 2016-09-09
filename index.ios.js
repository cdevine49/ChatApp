
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

const firebase = require('./config.js');
var TabBar = require('./components/TabBar.js');
var AuthNavigator = require('./components/AuthNavigator.js');
var Login = require('./components/Login.js');

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
        this.setState({ component: <TabBar />});
      } else {
        this.setState({ component: <AuthNavigator />});
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
