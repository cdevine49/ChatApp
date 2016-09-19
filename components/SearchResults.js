import React, {Component} from 'React';
import {
  Text,
  ListView,
  View
} from 'react-native';

import Search from './Search';
import SearchItem from './SearchItem';

const firebaseApp = require('../config.js');

import {styles} from '../styles.js';

export default class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
      // .cloneWithRows(this.props.users),
    };

    this.renderRow = this.renderRow.bind(this);
    this._search = this._search.bind(this);

    this.usersRef = firebaseApp.database().ref().child("users");
  }

  componentDidMount() {
    this._search(this.props.term);
  }

  componentWillReceiveProps(nextProps) {
    this._search(nextProps.term);
  }

  _search(term) {
    const start = term.toLowerCase();
    var last = start.charAt(start.length - 1).charCodeAt();
    if (last !== 32) {
      last = (last - 96) % 26;
    }
    const alpharry = "abcdefghijklmnopqrstuvwxyz".split('');
    const end = start.slice(0, start.length - 1) + alpharry[last];

    this.usersRef.orderByChild('sortName')
    .startAt(start)
    .endAt(end)
    .limitToFirst(5)
    .once('value', (snap) => {
      var users = [];
      snap.forEach((child) => {
        users.push({
          name: child.val().name,
        });
      });
      this.setState({ users: this.state.users.cloneWithRows(users) });
    });

  }

  // listenForConversations(conversationsRef) {
  //   conversationsRef.on('value', (snap) => {
  //     // get children as an array
  //     var conversations = [];
  //     snap.forEach((child) => {
  //       conversations.push({
  //         title: child.val().title,
  //         _key: child.key
  //       });
  //     });
  //
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(conversations),
  //     });
  //
  //   });
  // }

  renderRow(item) {
    // <SearchItem item={item} />
    return (
      <Text>{item.name}</Text>
    );
  }

  render() {

    return (
      <View>
        <ListView dataSource={this.state.users} renderRow={this.renderRow}></ListView>
      </View>
    );
  }
}
