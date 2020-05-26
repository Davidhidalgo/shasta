import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderWidth: 1,
  },
  editActions: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 8,
  },
});
