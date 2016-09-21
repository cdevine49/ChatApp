import React from 'React';
import {
  TabBarIOS,
  Text,
  View,
  Navigator
} from 'react-native';

import {styles} from '../styles.js';

var ConversationsList = require('./ConversationsList');
import Conversation from './Conversation';
var Account = require('./Account');
import Name from './Name.js';
import Email from './Email.js';
import ResetPassword from './ResetPassword.js';
import SearchResults from './SearchResults.js';
import Search from './Search.js';

export default class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedTab: "Home",
      searchTerm: ''
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

  setTerm(term) {
    this.setState({ searchTerm: term });
  }

  render() {

    const accountRoutes = [
      {component: "Account"},
      {component: "Name"},
      {component: "Email"},
      {component: "ResetPassword"},
    ];

    return (
      <View style={{flex: 1}}>

        <TabBarIOS>

          <TabBarIOS.Item
            title="Home"
            icon={require('../images/home.png')}
            selected={this.state.selectedTab === "Home"}
            onPress={() => {
              this.setState({ selectedTab: "Home" });
            }}>
            <Navigator
              style={{flex: 1, flexDirection: 'column-reverse'}}
              initialRoute={{component: 'Home'}}

              renderScene={(route, navigator) => {
                switch (route.component) {
                  case 'Home':
                    return <ConversationsList navigator={navigator} />;
                  case 'Searching':
                    return <Search navigator={navigator} term={route.term}/>;
                  case 'Search':
                    return <SearchResults navigator={navigator} term={route.term} />;
                  case 'Conversation':
                    return <Conversation navigator={navigator} users={route.users} />;
                }
              }}
              configureScene={(route, routeStack) =>
                Navigator.SceneConfigs.FadeAndroid
              }
            />

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
            <Navigator
              initialRoute={accountRoutes[0]}
              renderScene={(route, navigator) => {
                switch (route.component) {
                  case 'Account':
                    return <Account navigator={navigator}/>;
                  case 'Name':
                    return <Name navigator={navigator}/>;
                  case 'Email':
                    return <Email navigator={navigator}/>;
                  case 'ResetPassword':
                    return <ResetPassword navigator={navigator}/>;
                }
              }}
              configureScene={(route, routeStack) =>
                Navigator.SceneConfigs.FadeAndroid
              }
            />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}
