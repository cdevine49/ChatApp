import React, {Component} from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

import {styles} from '../styles.js';
const firebaseApp = require('../config.js');

export default class ConversationItem extends Component {
  render() {
    const currentUser = firebaseApp.auth().currentUser;
    const author = this.props.message.author === currentUser.displayName ? "You" : this.props.message.author;
    return (
      <Text>{author + ': ' + this.props.message.message}</Text>
    );
  }
}

// <TouchableHighlight onPress={this.props.onPress}>
//   <View style={styles.li}>
//     <Text style={styles.liText}>{this.props.item.title}</Text>
//   </View>
// </TouchableHighlight>
