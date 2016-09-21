import React, {Component} from 'React';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';

const firebaseApp = require('../config.js');

import {styles, PostMessageStyles} from '../styles.js';
import Button from './Button.js';

export default class PostMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    this.props.messageRef.push({
      author: firebaseApp.auth().currentUser.displayName,
      content: this.state.message
    });
  }

  render() {

    return (
      <View>
        <TextInput
          value={this.state.message}
          onChangeText={(message) => this.setState({ message: message })}
          placeholder='Message'
          onSubmitEditing={this.sendMessage}
          style={PostMessageStyles.newMessage}
          />
        <Button
          text='Send'
          onPress={this.sendMessage}
          button_styles={PostMessageStyles.sendButton}
          />
      </View>
    );
  }
}
