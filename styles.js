import React from 'React';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
  },

  loginContainer: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
  },

  scrollView: {
    backgroundColor: 'yellow',
    alignItems: 'stretch'
  },

  inputContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },

  loginButton: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#1b5480',
    borderRadius: 5,
    backgroundColor: '#287bbc',
    alignItems: 'center'
  },

  loginButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff'
  },

  toNewAccount: {
    flex: 1,
    borderWidth: 2,
  },

  toNewAccountText: {
    color: '#428bca'
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

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
  },

  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
  },

  inputContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },

  loginButton: {
    marginTop: 10,
  },

  toNewAccount: {
    flex: 1,
    alignItems: 'center'
  },

  toNewAccountText: {
    color: '#428bca'
  },

  textInput: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20
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
    borderRadius: 2,
  },
});

export const EditStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ddd',

  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingTop: 30,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8
  },

  cancel: {
    width: 50,
    color: '#428bca'
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  save: {
    width: 50,
    textAlign: 'right',
    color: '#428bca'
  },

  editable: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    paddingTop: 40,

  },

  editField: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },

  endText: {
    paddingLeft: 8,
  }
});

export const ButtonStyles = StyleSheet.create({
  view: {
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#1b5480',
    borderRadius: 5,
    backgroundColor: '#287bbc',
    alignItems: 'center'
  },

  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export const SearchBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingTop: 30,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8
  },

  searchBar: {
    flex: 7,
    height: 25,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 3,
  },

  cancel: {
    flex: 2,
    alignSelf: 'center'
  },

  text: {
    textAlign: 'center',
    color: '#428bca'
  },
});




// dfs
