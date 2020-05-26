import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './styles';

const LoadingView = () => (
  <View style={styles.loadingView}>
    <Text>Loading...</Text>
  </View>
);

export default function UserListItem({onTakePhoto = () => {}}) {
  const takePicture = async function(camera) {
    const options = {
      width: 100,
      quality: 1,
      base64: true,
      pauseAfterCapture: true,
      fixOrientation: true,
      mirrorImage: true,
    };
    const data = await camera.takePictureAsync(options);
    onTakePhoto(data);
  };
  return (
    <RNCamera
      style={{flex: 1}}
      type={RNCamera.Constants.Type.front}
      captureAudio={false}
      playSoundOnCapture={true}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}>
      {({camera, status}) => {
        if (status !== 'READY') return <LoadingView />;
        return (
          <View style={styles.triggerButtonContainer}>
            <TouchableOpacity
              style={styles.triggerButton}
              onPress={() => takePicture(camera)}
            />
          </View>
        );
      }}
    </RNCamera>
  );
}
