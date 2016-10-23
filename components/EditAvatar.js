import React, {Component} from 'React';
import {
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

const firebaseApp = require('../config.js');
const ReadImageData = require('NativeModules').ReadImageData;

import {EditStyles, AvatarStyles} from '../styles.js';
import Avatar from './Avatar.js';
import CameraRollView from './CameraRollView.js';
import Header from './Header.js';

export default class EditAvatar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      avatar: require('../images/default-avatar.png'),
      savable: false
    };
  }

  componentDidMount() {
    const uid = firebaseApp.auth().currentUser.uid;
    this.userRef = firebaseApp.database().ref().child('users').child(uid);

    this.userRef.once('value', (snap) => {
      if (snap.val().avatar) {
        this.setState({ avatar: snap.val().avatar});
      }
    });
  }

  onSave() {
    if (this.state.savable) {
      this.userRef.update({
        avatar: this.state.avatar
      })
      .then(this.props.navigator.pop);
    }
  }

  setAvatar(image) {
    ReadImageData.readImage(image.uri, (base64) => {
      this.setState({
        avatar: {uri: 'data:image/jpeg;base64,' + base64},
        savable: true
      });
    });
  }

  render() {

    return (
      <View style={EditStyles.container}>
        <Header navigator={this.props.navigator} title='Avatar' save={this.onSave.bind(this)}/>
        <View style={EditStyles.editable}>
          <Image style={AvatarStyles._large} source={this.state.avatar} />
          <Text style={EditStyles.endText}>Your avatar will help friends identify you on Chatter.</Text>
        </View>
      <CameraRollView upload={this.setAvatar.bind(this)} />
    </View>
    );
  }
}
