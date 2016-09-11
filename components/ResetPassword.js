import React, {Component} from 'React';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

const firebaseApp = require('../config.js');
import {styles} from '../styles.js';


export default class ResetPassword extends Component {

  constructor() {
    super();
    this.state = {
      name: firebaseApp.auth().currentUser.displayName
    };
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            value={this.state.name}
            onChangeText={(name) => this.setState({ name: name })}
            placeholder="Name"
            style={styles.textInput}
          />
      </View>
    </View>
    );
  }
}
