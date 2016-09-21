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

    this._search = this._search.bind(this);

    this.usersRef = firebaseApp.database().ref().child("users");
    this._startSearch = this._startSearch.bind(this);
    this._endSearch = this._endSearch.bind(this);
    this.searching = this.searching.bind(this);
  }

  _startSearch() {
    this.setState({ searching: true });
  }

  _endSearch() {
    this.refs._search.blur();
    for ( var i = 0; i < this.state.term.length; i++ ) {
      this.props.navigator.pop();
    }
    this.setState({ searching: false, term: '' });
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

  _search(term) {
    if (term.length === 1 && this.state.term.length === 0) {
      this.props.navigator.push({ component: 'Search', term: term});
    } else if (term.length > this.state.term.length) {
      this.props.navigator.push({ component: 'Search', term: term});
    } else if (term.length < this.state.term.length) {
      this.props.navigator.pop();
    }

    this.setState({ term: term });
  }

  render() {
    return (
      <View style={SearchBarStyles.container}>
        <TextInput
          ref="_search"
          value={this.state.term}
          onChangeText={(term) => this._search(term) }
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
