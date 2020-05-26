import {StyleSheet} from 'react-native';

export const colors = {
  shasta: '#0d758e',
};

export const common = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 13,
    paddingRight: 13,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.shasta,
    padding: 10,
  },
  button_text: {
    fontSize: 13,
    textTransform: 'uppercase',
    color: 'white',
  },
  link: {
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 'auto',
  },
  link_text: {
    color: colors.shasta,
  },
  inputText: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: '#ddd',
    backgroundColor: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
});
