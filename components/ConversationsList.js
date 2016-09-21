import React, {Component} from 'React';
import {
  Text,
  ListView,
  TextInput,
  View
} from 'react-native';

import Search from './Search';
import ConversationItem from './ConversationItem';

const firebaseApp = require('../config.js');

import {styles, SearchBarStyles} from '../styles.js';

class ConversationsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    const uid = firebaseApp.auth().currentUser.uid;
    this.conversationsRef = firebaseApp.database().ref()
    .child('users/' + uid + '/conversations');
    this.listenForConversations = this.listenForConversations.bind(this);

    this.renderRow = this.renderRow.bind(this);
    this._startSearch = this._startSearch.bind(this);
  }

  componentDidMount() {
    this.listenForConversations(this.conversationsRef);
  }

  listenForConversations(conversationsRef) {
    conversationsRef.orderByChild('timeSent')
    .on('value', (snap) => {
      // get children as an array
      var conversations = [];
      snap.forEach((child) => {
        conversations.unshift({
          _key: child.key,
          author: child.val().author,
          message: child.val().message,
          sent: child.val().timeSent,
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(conversations),
      });

    });
  }

  renderRow(message) {
    return (
      <ConversationItem message={message} navigator={this.props.navigator}/>
    );
  }

  _startSearch() {
    return null;
  }

  render() {

    return (
      <View style={{flex: 1, }}>
        <View style={SearchBarStyles.container}>
          <TextInput
            value=''
            onChangeText={ (term) => this.props.navigator.push({ component: 'Searching', term: term }) }
            placeholder="Search"
            autoCapitalize="none"
            onFocus={this._startSearch}
            style={SearchBarStyles.searchBar}
          />
        </View>
        <ListView style={{flex: 1, backgroundColor: 'green'}} dataSource={this.state.dataSource} renderRow={this.renderRow}></ListView>
      </View>
    );
  }
}

module.exports = ConversationsList;
