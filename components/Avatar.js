import React, {Component} from 'React';
import {
  View,
  Image,
  TouchableHighlight
} from 'react-native';

const firebaseApp = require('../config.js');

import {AvatarStyles} from '../styles.js';

export default class Avatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatar: require('../images/default-avatar.png'),
    };
  }

  componentDidMount() {
    const uid = firebaseApp.auth().currentUser.uid;
    this.avatarRef = firebaseApp.database().ref().child('users').child(uid).child('avatar');

    this.avatarRef.on('value', (snap) => {
      if (snap.val()) {
        this.setState({ avatar: snap.val()});
      } else {
        this.setState({ avatar: require('../images/default-avatar.png')});
      }
    });
  }

  componentWillUnmount() {
    this.avatarRef.off();
  }

  render() {

    return (
      <Image style={this.props.style} source={this.state.avatar} />
    );
  }
}
