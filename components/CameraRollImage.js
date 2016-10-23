import React, {Component} from 'React';
import {
  Text,
  TextInput,
  View,
  Image,
  Alert,
  TouchableHighlight,
  CameraRoll,
  ScrollView
} from 'react-native';

const ReadImageData = require('NativeModules').ReadImageData;

const firebaseApp = require('../config.js');

const {styles, LoginStyles} = require('../styles.js');
import Button from './Button.js';

const Login = require('./Login');


export default class CameraRollImage extends Component {

  constructor(props) {
    super(props);

    this.upload = this.upload.bind(this);
  }

  upload(image) {
    // const uid = firebaseApp.auth().currentUser.uid;
    ReadImageData.readImage(image.uri, (base64) => {
      console.log(base64);
      // this.props.upload(base64);
    });
  }

  render() {
    // console.log(this.props.image);
    return (
      <TouchableHighlight onPress={() => this.props.upload(this.props.image)}>
        <Image style={{height: this.context.keyboardHeight, width: this.context.keyboardHeight}} source ={{ uri: this.props.image.uri }}/>
      </TouchableHighlight>
    );
  }

}

CameraRollImage.contextTypes = {
  keyboardHeight: React.PropTypes.number
};
