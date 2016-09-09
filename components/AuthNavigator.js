import React, {Component} from 'React';
import {
  Navigator
} from 'react-native';

import {styles} from '../styles.js';

const Login = require('./Login');
const Signup = require('./Signup');


class AuthNavigator extends Component{

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
      component: Login
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
    firebase.database().ref('users/' + user.uid).set({
      name: this.state.name,
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

  render() {
    const routes = [
      {title: 'Login'},
      {title: 'Signup'}
    ];

    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={(route, navigator) => {
          switch (route.title) {
            case 'Login':
              return <Login navigator={navigator}/>;
            case 'Signup':
              return <Signup navigator={navigator}/>;

            }
          }
        }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FadeAndroid
        }
      />

    );
  }

}

module.exports = AuthNavigator;
