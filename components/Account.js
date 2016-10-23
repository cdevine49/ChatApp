import React, {Component} from 'React';
import {
  Text,
  View,
  Image,
  ScrollView,
  Navigator,
  TouchableHighlight
} from 'react-native';

var ConversationItem = require('./ConversationItem');
import Button from './Button.js';
import Avatar from './Avatar.js';

const firebaseApp = require('../config.js');

import {styles, AccountStyles, AvatarStyles} from '../styles.js';

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: firebaseApp.auth().currentUser,
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    firebaseApp.auth().signOut();
  }

  goTo(view) {
    this.props.navigator.push({
      component: view
    });
  }

  render() {
    routes = [
      {component: 'EditName'},
      {component: 'EditEmail'},
      {component: 'ResetPassword'}
    ];

    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}>
        <TouchableHighlight onPress={() => this.goTo('Avatar')}>
          <View style={AccountStyles.profilePicContainer}>
            <Avatar style={AvatarStyles._large} />
          </View>
        </TouchableHighlight>

        <View style={AccountStyles.editAndLogoutContainer}>
          <TouchableHighlight onPress={() => this.goTo('Name')} style={AccountStyles.profileInfo}>
            <View style={AccountStyles.profileView}>
              <Text style={AccountStyles.profileTextLabel}>Name</Text>
              <Text style={AccountStyles.profileText}>{this.state.currentUser.displayName}</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.goTo('Email')} style={AccountStyles.profileInfo}>
            <View style={AccountStyles.profileView}>
              <Text style={AccountStyles.profileTextLabel}>Email</Text>
              <Text style={AccountStyles.profileText}>{this.state.currentUser.email}</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.goTo('ResetPassword')} style={AccountStyles.profileInfo}>
            <View style={AccountStyles.profileView}>
              <Text style={AccountStyles.profileTextLabel}>Reset Password</Text>
            </View>
          </TouchableHighlight>

          <Button
            text='Logout'
            onPress={this.logout}
            button_styles={AccountStyles.logoutButton}
            button_text_styles={AccountStyles.logoutButtonText}
            />
        </View>
      </ScrollView>
    );
  }
}

module.exports = Account;
