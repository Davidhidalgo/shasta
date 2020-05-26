import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triggerButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  triggerButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 15,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
