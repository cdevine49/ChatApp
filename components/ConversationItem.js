import React, {Component} from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

import {styles} from '../styles.js';

export default class ConversationItem extends Component {
  render() {
    return (
      <Text>{this.props.message.author + ': ' + this.props.message.message}</Text>
    );
  }
}

// <TouchableHighlight onPress={this.props.onPress}>
//   <View style={styles.li}>
//     <Text style={styles.liText}>{this.props.item.title}</Text>
//   </View>
// </TouchableHighlight>
