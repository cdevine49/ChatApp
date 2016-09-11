import React, {Component} from 'React';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import {ButtonStyles} from '../styles';

export default class Button extends Component {

  render(){
    return (
      <View>
        <TouchableHighlight
          underlayColor={"#E8E8E8"}
          onPress={this.props.onPress}
          style={[ButtonStyles.view, this.props.button_styles]}>
          <View>
              <Text style={[ButtonStyles.text, this.props.button_text_styles]}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
