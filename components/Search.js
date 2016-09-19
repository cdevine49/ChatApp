import React, {Component} from 'react';
import { View, TouchableHighlight, Text, TextInput } from 'react-native';

const firebaseApp = require('../config.js');

import SearchResults from './SearchResults.js';
import {styles, SearchBarStyles} from '../styles.js';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      term: ""
    };

    // this._search = this._search.bind(this);
    this.usersRef = firebaseApp.database().ref().child("users");
    this._startSearch = this._startSearch.bind(this);
    this._endSearch = this._endSearch.bind(this);
    this.searching = this.searching.bind(this);
  }

  // _search(term) {
  //   const start = term.toLowerCase();
  //   var last = start.charAt(start.length - 1).charCodeAt();
  //   if (last !== 32) {
  //     last = (last - 96) % 26;
  //   }
  //   const alpharry = "abcdefghijklmnopqrstuvwxyz".split('');
  //   const end = start.slice(0, start.length - 1) + alpharry[last];
  //
  //   this.usersRef.orderByChild('name')
  //   .startAt(start)
  //   .endAt(end)
  //   .limitToFirst(5)
  //   .once('value', (snap) => {
  //     var users = [];
  //     snap.forEach((child) => {
  //       users.push({
  //         name: child.val().name,
  //       });
  //     });
  //   });
  // }

  _startSearch() {
    this.setState({ searching: true });
    this.props.searching(true);
  }

  _endSearch() {
    this.refs._search.blur();
    this.setState({ searching: false, term: '' });
    this.props.searching(false);
  }

  searching() {
    if (this.state.searching) {
      return (
          <TouchableHighlight style={SearchBarStyles.cancel} onPress={this._endSearch}>
            <Text style={SearchBarStyles.text}>Cancel</Text>
          </TouchableHighlight>
      );
    }
  }

  render() {
    return (
      <View style={SearchBarStyles.container}>
        <TextInput
          ref="_search"
          value={this.state.term}
          onChangeText={(term) => {
            this.setState({ term: term });
            this.props.setTerm(term);
          }}
          placeholder="Search"
          autoCapitalize="none"
          onFocus={this._startSearch}
          style={SearchBarStyles.searchBar}
        />
        {this.searching()}
      </View>
    );
  }
}
