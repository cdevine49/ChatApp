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
      term: this.props.term
    };

    this._search = this._search.bind(this);

    this.usersRef = firebaseApp.database().ref().child("users");
    this._endSearch = this._endSearch.bind(this);
  }

  _endSearch() {
    this.props.navigator.pop();
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
    console.log(this.props.navigator.state.routeStack);
    console.log(this.state.term);
    return (
      <View>
        <View style={SearchBarStyles.container}>
          <TextInput
            ref="_search"
            value={this.state.term}
            onChangeText={(term) => this.setState({term: term}) }
            placeholder="Search"
            autoCapitalize="none"
            autoFocus={true}
            style={SearchBarStyles.searchBar}
          />

          <TouchableHighlight style={SearchBarStyles.cancel} onPress={this._endSearch}>
            <Text style={SearchBarStyles.text}>Cancel</Text>
          </TouchableHighlight>
        </View>
        <SearchResults term={this.state.term} navigator={this.props.navigator}/>
      </View>
    );
  }
}
