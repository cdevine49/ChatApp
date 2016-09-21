import React, {Component} from 'React';
import {
  Text,
  ListView,
  View,
  TouchableHighlight
} from 'react-native';

const firebaseApp = require('../config.js');

import {styles} from '../styles.js';

export default class Conversation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  render() {

    return (
      <View>
        <Text>Post</Text>
      </View>
    );
  }
}
