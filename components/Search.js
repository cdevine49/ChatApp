import React, {Component} from 'react';
import { View, TouchableHighlight, Text, TextInput } from 'react-native';

import {styles} from '../styles.js';

export default class Search extends Component {

  constructor() {
    super();
    this.state = {
      text: ""
    };

    this.usersRef = firebaseApp.database().ref().child("users");
    this._search = this._search.bind(this);
  }

  _search() {

  }

  render() {
    return (
      <View>
        <TextInput
          value={this.state.text}
          onChangeText={(text) => this.setState({ text: text })}
          placeholder="Search"
          autoCapitalize="none"
          style={styles.textInput}
        />
      </View>
    );
  }
}
