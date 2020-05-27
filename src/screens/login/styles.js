import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  inputTextUsername: {
    textAlign: 'center',
    width: width * 0.6,
    maxWidth: 250,
  },
  registerButton: {
    width: width * 0.6,
    maxWidth: 250,
    marginBottom: 8,
  },
  loginWrapper: {
    width: width * 0.6,
    maxWidth: 250,
  },
  loginButton: {
    width: width * 0.6,
    maxWidth: 250,
    marginBottom: 8,
  },
  or: {
    alignSelf: 'center',
    color: '#777',
    fontSize: 12,
  },
});
