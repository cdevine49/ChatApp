import React, {Component} from 'React';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const firebaseApp = require('../config.js');

import {styles, EditStyles} from '../styles.js';
import Header from './Header.js';


export default class Name extends Component {

  constructor() {
    super();
    this.state = {
      name: firebaseApp.auth().currentUser.displayName
    };

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    user = firebaseApp.auth().currentUser;

    user.updateProfile({
      displayName: this.state.name,
    })
    .then( () => {
      firebaseApp.database().ref('users/' + user.uid).update({
        name: user.displayName,
        sortName: user.displayName.toLowerCase()
      });
    })
    .then(this.props.navigator.pop);
  }

  render(){
    return (
      <View style={EditStyles.container}>
        <Header navigator={this.props.navigator} title='Name' save={this.onSave}/>
        <View style={EditStyles.editable}>
          <TextInput
            value={this.state.name}
            onChangeText={(name) => this.setState({ name: name })}
            placeholder="Name"
            style={EditStyles.editField}
            autoFocus={true}
          />
          <Text style={EditStyles.endText}>Your name is the main way friends will find you on Chatter.</Text>
        </View>
      <KeyboardSpacer />
    </View>
    );
  }
}
