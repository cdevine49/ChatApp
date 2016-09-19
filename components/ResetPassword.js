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
      password: '',
      newPassword: '',
      confirmation: ''
    };

    this.handleErrors = this.handleErrors.bind(this);
  }

  onSave() {
    const user = firebaseApp.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.password);
    user.reauthenticate(credential)
    .then(() => user.updatePassword(this.state.newPassword))
    .then(this.props.navigator.pop)
    .catch(this.handleErrors);
  }

  handleErrors() {
    switch(error.code) {
      // case "auth/invalid-email":
      //   alert("Your email is invalid");
      //   break;
      // case "auth/email-already-in-use":
      //   alert("Email already in use");
      //   break;
      // case "auth/user-disabled":
      //   alert("Account has been disabled");
      //   break;
      // case "auth/user-not-found":
      //   alert("No user associated with email");
      //   break;
      case "auth/wrong-password":
        alert("Password invalid for given email");
        break;
      default:
        alert("Error changing password");
    }
  }

  render(){
    return (
      <View style={EditStyles.container}>
        <Header navigator={this.props.navigator} title='Reset Password' save={this.onSave}/>
        <View style={EditStyles.editable}>
          <View>
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password: password })}
              placeholder="Enter old password"
              style={EditStyles.editField}
              secureTextEntry={true}
              autoCapitalize="none"
              autoFocus={true}
            />
          </View>

          <View>
            <TextInput
              value={this.state.newPassword}
              secureTextEntry={true}
              onChangeText={(newPassword) => this.setState({ newPassword: newPassword })}
              placeholder="Enter your new password"
              style={EditStyles.editField}
            />
          </View>

          <View>
            <TextInput
              value={this.state.confirmation}
              secureTextEntry={true}
              onChangeText={(confirmation) => this.setState({ confirmation: confirmation })}
              placeholder="Confirm your new password"
              style={EditStyles.editField}
            />
          </View>
        <Text style={EditStyles.endText}>To change your password, first enter your current password and then enter and confirm your new password.</Text>
      </View>
      <KeyboardSpacer />
    </View>
    );
  }
}
