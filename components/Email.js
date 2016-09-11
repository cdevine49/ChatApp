import React, {Component} from 'React';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as firebase from 'firebase';

const firebaseApp = require('../config.js');

import {styles, EditStyles} from '../styles.js';
import Header from './Header.js';


export default class Email extends Component {

  constructor() {
    super();
    this.state = {
      email: firebaseApp.auth().currentUser.email,
      password: ""
    };

    this.onSave = this.onSave.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  handleErrors(error) {
    switch(error.code) {
      case "auth/invalid-email":
        alert("Your email is invalid");
        break;
      case "auth/email-already-in-use":
        alert("Email already in use");
        break;
      case "auth/user-disabled":
        alert("Account has been disabled");
        break;
      case "auth/user-not-found":
        alert("No user associated with email");
        break;
      case "auth/wrong-password":
        alert("Password invalid for given email");
        break;
      default:
        alert("Error logging in user");
    }
  }

  onSave() {
    const user = firebaseApp.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.password);
    user.reauthenticate(credential)
    .then(() => user.updateEmail(this.state.email))
    .then(this.props.navigator.pop)
    .catch(this.handleErrors);
  }

  render(){
    return (
      <View style={EditStyles.container}>
        <Header navigator={this.props.navigator} title='Email' save={this.onSave}/>
        <View style={EditStyles.editable}>
          <View>
            <TextInput
              value={this.state.email}
              onChangeText={(email) => this.setState({ email: email })}
              placeholder="Enter new email"
              style={EditStyles.editField}
              autoCapitalize="none"
              autoFocus={true}
            />
          </View>
          <View>
            <TextInput
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password: password })}
              placeholder="Enter your password"
              style={EditStyles.editField}
            />
          </View>
        <Text style={EditStyles.endText}>Your email is the main way friends will find you on Chatter.</Text>
      </View>
      <KeyboardSpacer />
    </View>
    );
  }
}
