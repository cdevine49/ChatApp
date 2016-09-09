import React, {Component} from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

import {styles} from '../styles.js';

class ListItem extends Component {
  render() {
    return (
      <Text>Conversation</Text>
    );
  }
}

module.exports = ListItem;

// <TouchableHighlight onPress={this.props.onPress}>
//   <View style={styles.li}>
//     <Text style={styles.liText}>{this.props.item.title}</Text>
//   </View>
// </TouchableHighlight>
