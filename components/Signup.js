import React, {Component} from 'React';
import {
  Text,
  TextInput,
  View,
  Image,
  Alert,
  TouchableHighlight
} from 'react-native';


const firebaseApp = require('../config.js');

const ReadImageData = require('NativeModules').ReadImageData;

const {styles, LoginStyles, AvatarStyles} = require('../styles.js');
import Button from './Button.js';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CameraRollView from './CameraRollView';

const Login = require('./Login');


class Signup extends Component{

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmation: '',
      avatar: require('../images/default-avatar.png'),
      choosingAvatar: false,
    };

    this.goToLogin = this.goToLogin.bind(this);
    this.createUser = this.createUser.bind(this);
    this.createProfile = this.createProfile.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.focusNext = this.focusNext.bind(this);
    this.verifyInfo = this.verifyInfo.bind(this);
    this.getAvatar = this.getAvatar.bind(this);
  }

  goToLogin() {
    this.props.navigator.push({
      title: 'Login'
    });
  }

  verifyInfo() {
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

    return user;
  }

  addToDatabase(user) {
    console.log(this.state.avatar);
    firebaseApp.database().ref('users/' + user.uid).set({
      name: this.state.name,
      sortName: this.state.name.toLowerCase(),
      email: user.email,
      avatar: this.state.avatar
    });
  }

  handleErrors(error) {
    console.log(error);
    switch(error.code) {
      case "auth/email-already-in-use":
        alert("Email already in use");
        this.focusNext('2');
        break;
      case "auth/invalid-email":
        alert("Your email is invalid");
        this.focusNext('2');
        break;
      case "auth/weak-password":
        alert("Password must be 6 characters or longer");
        this.focusNext('3');
        break;
      default:
        alert("Error creating user");
    }
  }

  focusNext(num) {
    this.refs['signup' + num].focus();
  }

  showCameraRoll() {
    if (this.state.choosingAvatar) {
      return (
        <CameraRollView
          upload={this.setAvatar.bind(this)}
          cancel={() => this.setState({ choosingAvatar: false })} />
      );
    }
  }

  setAvatar(image) {
    ReadImageData.readImage(image.uri, (base64) => {
      this.setState({avatar: {uri: 'data:image/jpeg;base64,' + base64}});
    });
  }

  getAvatar() {
    [1,2,3,4].forEach(num => {
      this.refs['signup' + num].blur();
    });


    this.setState({ choosingAvatar: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={ this.getAvatar }>
          <View style={styles.avatarUpload}>
            <Text style={styles.avatarUploadText}>Select Avatar (optional)</Text>
            <Image style={AvatarStyles._medium} source={this.state.avatar} />
          </View>
        </TouchableHighlight>
        <TextInput style={styles.textInput}
          ref='signup1'
          value={this.state.name}
          onChangeText={(name) => this.setState({ name: name })}
          placeholder="Name"
          autoFocus={true}
          onFocus={() => this.setState({ choosingAvatar: false })}
          onSubmitEditing={() => this.focusNext('2')}
        />
        <TextInput style={styles.textInput}
          ref='signup2'
          value={this.state.email}
          autoCapitalize="none"
          onChangeText={(email) => this.setState({ email: email })}
          placeholder="Email"
          onFocus={() => this.setState({ choosingAvatar: false })}
          onSubmitEditing={() => this.focusNext('3')}

        />
        <TextInput style={styles.textInput}
          ref='signup3'
          value={this.state.password}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => this.setState({ password: password })}
          placeholder="Password"
          onFocus={() => this.setState({ choosingAvatar: false })}
          onSubmitEditing={() => this.focusNext('4')}

        />
        <TextInput style={styles.textInput}
          ref='signup4'
          value={this.state.confirmation}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(confirmation) => this.setState({ confirmation: confirmation })}
          placeholder="Confirm Password"
          onFocus={() => this.setState({ choosingAvatar: false })}
          onSubmitEditing={() => this.verifyInfo('4')}
        />

        <Button
          text='Create your account'
          onPress={this.verifyInfo}
          button_styles={LoginStyles.loginButton}
          />



        <TouchableHighlight onPress={this.goToLogin}>
          <View>
            <Text>Login to existing account</Text>
          </View>
        </TouchableHighlight>

        {this.showCameraRoll()}
        <KeyboardSpacer />
      </View>
    );
  }
}

module.exports = Signup;
