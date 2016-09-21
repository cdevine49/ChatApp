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
    const messageData = {
      author: firebaseApp.auth().currentUser.displayName,
      message: this.state.message,
      timeSent: Date.now()
    };

    // const messageKey = this.props.conversationRef.push().key;
    const path = 'conversations/' + this.props.uids.join('_');
    const messageKey = firebaseApp.database().ref()
    .child(path).push().key;

    var updates = {};
    this.props.uids.forEach((uid) => {
      updates['users/' + uid + '/' + path] = messageData;
    });
    updates[path + '/' + messageKey] = messageData;

    firebaseApp.database().ref().update(updates);
    this.setState({ message: '' });
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
