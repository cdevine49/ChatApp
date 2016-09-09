import React from 'React';
import {
  TabBarIOS,
  Text,
  View
} from 'react-native';

import {styles} from '../styles.js';

var ConversationsList = require('./ConversationsList');
var Account = require('./Account');

class TabBar extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedTab: "Account"
    };

    this._renderContent = this._renderContent.bind(this);
  }

  _renderContent(color) {
    return (
      <View style={styles.tabContent}>
        <Text>{this.state.selectedTab}</Text>
      </View>
    );
  }

  render() {

    return (
      <TabBarIOS>

        <TabBarIOS.Item
          title="Home"
          icon={require('../images/home.png')}
          selected={this.state.selectedTab === "Home"}
          onPress={() => {
            this.setState({ selectedTab: "Home" });
          }}>
          <ConversationsList />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Groups"
          icon={require('../images/groups.png')}
          selected={this.state.selectedTab === "Groups"}
          onPress={() => {
            this.setState({ selectedTab: "Groups" });
          }}>
          {this._renderContent()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Contacts"
          icon={require('../images/contacts.png')}
          selected={this.state.selectedTab === "Contacts"}
          onPress={() => {
            this.setState({ selectedTab: "Contacts" });
          }}>
          {this._renderContent()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Account"
          icon={require('../images/account.png')}
          selected={this.state.selectedTab === "Account"}
          onPress={() => {
            this.setState({ selectedTab: "Account" });
          }}>
          <Account />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = TabBar;
