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
import CameraRollImage from './CameraRollImage.js';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const Login = require('./Login');


export default class CameraRollView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      images: []
    };


    this.getPhotos = this.getPhotos.bind(this);
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos() {
    CameraRoll.getPhotos({first: 25, assetType: 'Photos'})
    .then((data) => {
      images = data.edges.map((asset) => asset.node.image);
      this.setState({ images: images });
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{alignSelf: 'flex-end', height: this.context.keyboardHeight}}
        horizontal={true}>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',}}>
          {this.state.images.map((image, i) => <CameraRollImage key={i} image={image} upload={this.props.upload} /> )}
        </View>
      </ScrollView>
    );
  }

}

CameraRollView.contextTypes = {
  keyboardHeight: React.PropTypes.number
};
