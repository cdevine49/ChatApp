import React, {Component} from 'React';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

import {EditStyles} from '../styles.js';


export default class Header extends Component {

  constructor(props) {
    super(props);

    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    this.props.navigator.pop();
  }

  render(){
    return (
      <View style={EditStyles.header}>
        <TouchableHighlight onPress={this.cancel}>
          <Text style={EditStyles.cancel}>Cancel</Text>
        </TouchableHighlight>
        <Text style={EditStyles.title}>{this.props.title}</Text>
        <TouchableHighlight onPress={this.props.save}>
          <Text style={EditStyles.save}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
