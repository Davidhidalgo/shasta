import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputNameContainer: {
    justifyContent: 'center',
    width: '30%',
    height: 55,
    paddingLeft: 16,
    paddingRight: 8,
  },
  inputValueContainer: {
    justifyContent: 'center',
    width: '70%',
    height: 55,
    paddingLeft: 8,
    paddingRight: 16,
  },
  inputText: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
  },
  textName: {
    fontWeight: 'bold',
    padding: 4,
  },
  textValue: {
    padding: 4,
  },
});
