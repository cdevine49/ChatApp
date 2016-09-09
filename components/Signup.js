import React, {Component} from 'React';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';


const firebaseApp = require('../config.js');

const styles = require('../styles.js');

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
    this.handleErrors = this.handleErrors.bind(this);
  }

  goToLogin() {
    this.props.navigator.push({
      title: 'Login'
    });
  }

  createUser() {
    const profile = (user) => {
      console.log('user created', this);
      firebase.database().ref('users/' + user.uid).set({
        name: this.state.name,
        email: user.email
      });
    };

    firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email, this.state.password
    )
    .then(this.createProfile)
    .catch(this.handleErrors);
  }

  createProfile(user) {
    console.log(user);
    user.updateProfile({
      displayName: this.state.name,
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

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput}
          value={this.state.name}
          onChangeText={(name) => this.setState({ name: name })}
          placeholder="Name"
        />
        <TextInput style={styles.textInput}
          value={this.state.email}
          autoCapitalize="none"
          onChangeText={(email) => this.setState({ email: email })}
          placeholder="Email"
        />
        <TextInput style={styles.textInput}
          value={this.state.password}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => this.setState({ password: password })}
          placeholder="Password"
        />
        <TextInput style={styles.textInput}
          value={this.state.confirmation}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(confirmation) => this.setState({ confirmation: confirmation })}
          placeholder="Confirm Password"
        />

        <TouchableHighlight onPress={this.createUser}>
          <View>
            <Text>Create your account</Text>
          </View>
        </TouchableHighlight>

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
