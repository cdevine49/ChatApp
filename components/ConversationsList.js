import React, {Component} from 'React';
import {
  Text,
  ListView,
  View
} from 'react-native';

import Search from './Search';
var ConversationItem = require('./ConversationItem');

const firebaseApp = require('../config.js');

import {styles} from '../styles.js';

class ConversationsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    this.conversationsRef = firebaseApp.database().ref().child("conversations");
    this.listenForConversations = this.listenForConversations.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.listenForConversations(this.conversationsRef);
  }

  listenForConversations(conversationsRef) {
    conversationsRef.on('value', (snap) => {
      // get children as an array
      var conversations = [];
      snap.forEach((child) => {
        conversations.push({
          title: child.val().title,
          _key: child.key
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(conversations),
      });

    });
  }

  renderRow(item) {
    return (
      <ConversationItem item={item} />
    );
  }

  render() {

    return (
      <View>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow}></ListView>
      </View>
    );
  }
}

module.exports = ConversationsList;
