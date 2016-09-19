import React, {Component} from 'React';
import {
  Text,
  ListView,
  View,
  TouchableHighlight
} from 'react-native';

const firebaseApp = require('../config.js');

import {styles} from '../styles.js';

export default class Conversation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

    var users = this.props.users;
    users.push(firebaseApp.auth().currentUser);
    var uids = users.map((user) => {
      return user.uid;
    });

    uids = uids.sort();

    this.messageRef = firebaseApp.database().ref("messages" + uids.join(','));
  }

  componentDidMount() {
  }


  render() {

    return (
      <View>
        <Text>Conversation</Text>
      </View>
    );
  }
}
