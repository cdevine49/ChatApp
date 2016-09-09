import React from 'React';
import {StyleSheet} from 'react-native';

export const styles =  StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
  },

  scrollView: {
    // flex: 1,
    // marginBottom: 69,
    backgroundColor: 'yellow',
    alignItems: 'stretch'
  },

  inputContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 2,
    margin: 15,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },

  textInput: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20
  },

  textInputBorderTop: {
    borderTopWidth: 1,
    borderColor: '#eee'
  },

  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export const AccountStyles = StyleSheet.create({
  profilePicContainer: {
    height: 440,
    backgroundColor: '#eee',
  },

  editAndLogoutContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'stretch',
  },

  profileInfo: {
    backgroundColor: '#fff',
  },

  profileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  profileTextLabel: {
    fontWeight: '500'
  },

  profileText: {
    fontWeight: '200'
  },

  logoutButton: {
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#1b5480',
    borderRadius: 2,
    backgroundColor: '#287bbc',
    alignItems: 'center'
  },

  logoutButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff'
  }
});
