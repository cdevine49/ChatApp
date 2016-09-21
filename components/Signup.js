import React, {Component} from 'React';
import {
  Text,
  TextInput,
  View,
  Alert,
  TouchableHighlight
} from 'react-native';


const firebaseApp = require('../config.js');

const {styles, LoginStyles} = require('../styles.js');
import Button from './Button.js';

const Login = require('./Login');


class Signup extends Component{

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmation: ''
    };

    this.goToLogin = this.goToLogin.bind(this);
    this.createUser = this.createUser.bind(this);
    this.createProfile = this.createProfile.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.focusNext = this.focusNext.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
  }

  goToLogin() {
    this.props.navigator.push({
      title: 'Login'
    });
  }

  confirmPassword() {
    if (this.state.password === this.state.confirmation) {
      this.createUser();
    } else {
      this.setState({ password: '', confirmation: ''});
      Alert.alert(
        "Password Confirmation",
        "Passwords don't match",
        [
          { text: 'OK', onPress: () => this.focusNext('3') }
        ]);
    }
  }

  createUser() {
    firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email, this.state.password
    )
    .then(this.createProfile)
    .then(this.addToDatabase)
    .catch(this.handleErrors);
  }

  createProfile(user) {
    user.updateProfile({
      displayName: this.state.name,
    });

    return Promise.resolve(user);
  }

  addToDatabase(user) {
    firebaseApp.database().ref('users/' + user.uid).set({
      name: this.state.name,
      sortName: this.state.name.toLowerCase(),
      email: user.email
    });
  }

  handleErrors(error) {
    switch(error.code) {
      case "auth/email-already-in-use":
        alert("Email already in use");
        break;
      case "auth/invalid-email":
        alert("Your email is invalid");
        break;
      case "auth/weak-password":
        alert("Password must be 6 characters or longer");
        break;
      default:
        alert("Error creating user");
    }
  }

  focusNext(num) {
    this.refs['signup' + num].focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput}
          ref='signup1'
          value={this.state.name}
          onChangeText={(name) => this.setState({ name: name })}
          placeholder="Name"
          autoFocus={true}
          onSubmitEditing={() => this.focusNext('2')}
        />
        <TextInput style={styles.textInput}
          ref='signup2'
          value={this.state.email}
          autoCapitalize="none"
          onChangeText={(email) => this.setState({ email: email })}
          placeholder="Email"
          focus={this.state.focusNum === 2}
          onSubmitEditing={() => this.focusNext('3')}

        />
        <TextInput style={styles.textInput}
          ref='signup3'
          value={this.state.password}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => this.setState({ password: password })}
          placeholder="Password"
          onSubmitEditing={() => this.focusNext('4')}

        />
        <TextInput style={styles.textInput}
          ref='signup4'
          value={this.state.confirmation}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(confirmation) => this.setState({ confirmation: confirmation })}
          placeholder="Confirm Password"
          onSubmitEditing={() => this.confirmPassword('4')}
        />

        <Button
          text='Create your account'
          onPress={this.confirmPassword}
          button_styles={LoginStyles.loginButton}
          />

        <TouchableHighlight onPress={this.goToLogin}>
          <View>
            <Text>Login to existing account</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

}

module.exports = Signup;
