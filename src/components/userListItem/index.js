import React, {useContext} from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../authContext';
import userStore from '../../userStore';
import styles from './styles';

export default function UserListItem({username, onPress}) {
  const {username: loggedUsername} = useContext(AuthContext);
  const isUser = loggedUsername === username;
  const [userPhoto] = userStore.useUserPhoto(username);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <Image
          style={styles.profileImage}
          source={{uri: `data:image/jpge;base64,${userPhoto}`}}
        />
        <Text style={{fontSize: 16}}>
          {username}
          {isUser && ' (Me)'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
