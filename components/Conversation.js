import React, {Component} from 'React';
import {
  Text,
  ListView,
  View,
  TouchableHighlight
} from 'react-native';

const firebaseApp = require('../config.js');

import PostMessage from './PostMessage.js';
import {styles} from '../styles.js';

export default class Conversation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

    var users = this.props.users;
    users.push(firebaseApp.auth().currentUser);
    var uids = users.map((user) => {
      return user.uid;
    });

    uids = uids.sort();

    this.messageRef = firebaseApp.database().ref("messages/" + uids.join('_'));

    this.messageListener = this.messageListener.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.messageListener(this.messageRef);
  }

  messageListener(messageRef) {
    messageRef.on('value', (snap) => {
      // get children as an array
      var messages = [];
      snap.forEach((child) => {
        messages.push({
          author: child.val().author,
          content: child.val().content,
          _key: child.key
        });
      });
      this.setState({
        messages: this.state.messages.cloneWithRows(messages),
      });

    });
  }

  renderRow(message) {
    // <Message text={message} />
    return (
      <Text>MessageExample</Text>
    );
  }

  render() {

    return (
      <View>
        <ListView dataSource={this.state.messages} renderRow={this.renderRow}></ListView>
        <PostMessage messageRef={this.messageRef}/>
      </View>
    );
  }
}
