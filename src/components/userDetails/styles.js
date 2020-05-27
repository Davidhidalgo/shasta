import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
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
    maxWidth: 500,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 8,
  },
});
