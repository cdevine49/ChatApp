import React, {Component} from 'React';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';

const firebaseApp = require('../config.js');

const Signup = require('./Signup');

import {styles, LoginStyles} from '../styles.js';
import Button from './Button.js';

class Login extends Component{

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.goToSignup = this.goToSignup.bind(this);
    this.login = this.login.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  goToSignup() {
    this.props.navigator.push({
      title: 'Signup'
    });
  }

  login() {
    firebaseApp.auth().signInWithEmailAndPassword(
      this.state.email,
      this.state.password
    )
    .catch(this.handleErrors);
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

  render() {
    return (
      <View style={LoginStyles.container}>
        <View style={LoginStyles.loginContainer}>
          <View style={LoginStyles.inputContainer}>
            <View>
              <TextInput
                value={this.state.email}
                onChangeText={(email) => this.setState({ email: email })}
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>
            <View style={styles.textInputBorderTop}>
              <TextInput
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password: password })}
                placeholder="Password"
                style={styles.textInput}
              />
            </View>
          </View>

          <Button
            text='Login'
            onPress={this.login}
            button_styles={LoginStyles.loginButton}
            />
        </View>


        <TouchableHighlight style={{flex: 1}} onPress={this.goToSignup}>
          <View style={LoginStyles.toNewAccount}>
            <Text style={LoginStyles.toNewAccountText}>Create new account</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

}

module.exports = Login;
