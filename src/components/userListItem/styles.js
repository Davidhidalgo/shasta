import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderWidth: 1,
    marginRight: 16,
  },
});
