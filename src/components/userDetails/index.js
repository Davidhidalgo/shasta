import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Button,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import userStore from '../../userStore';
import UserValueItem from '../userValueItem';
import CameraView from '../../components/cameraView';
import styles from './styles';
import {common as commonStyles} from '../../styles/common';

export default function UserDetails({username, isEditable = false}) {
  const [isDataEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [draftUser, setDraftUser] = useState({});

  const [user, setUser] = userStore.useUser(username);
  const [userPhoto] = userStore.useUserPhoto(username, isTakingPhoto);

  const updateUserPhoto = async data => {
    await userStore.updateUserPhoto(username, data.base64);
    setIsTakingPhoto(false);
  };

  return (
    <View style={{flex: 1}}>
      {isTakingPhoto ? (
        <CameraView onTakePhoto={updateUserPhoto} />
      ) : (
        <ScrollView>
          {userPhoto && (
            <View
              style={{paddingTop: 16, paddingBottom: 16, alignItems: 'center'}}>
              <Image
                style={styles.profileImage}
                source={{uri: `data:image/jpge;base64,${userPhoto}`}}
              />
              {isEditing && (
                <TouchableOpacity
                  style={{
                    ...commonStyles.button,
                    marginTop: 8,
                    width: 100,
                  }}
                  onPress={() => setIsTakingPhoto(true)}>
                  <Text style={commonStyles.button_text}>Change</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {user?.data?.map((item, i) => {
            return (
              <UserValueItem
                name={item.name}
                value={item.value}
                key={i}
                isEditing={isEditing}
                onUpdate={newItem => {
                  const userCopy = {...user};
                  userCopy.data[i] = newItem;
                  setUser(userCopy);
                  setIsEdited(true);
                }}
              />
            );
          })}
          <View style={{marginBottom: 48}} />
        </ScrollView>
      )}

      {isEditable && !isTakingPhoto && (
        <View
          style={{
            ...styles.editActions,
            justifyContent: isEditing ? 'space-between' : 'center',
          }}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={commonStyles.button}
                onPress={() => {
                  setUser(JSON.parse(JSON.stringify(draftUser)));
                  setDraftUser(null);
                  setIsEdited(false);
                  setIsEditing(false);
                }}>
                <Text style={commonStyles.button_text}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={commonStyles.button}
                onPress={() => {
                  const userCopy = {...user};
                  userCopy.data = [...userCopy.data, {name: '', value: ''}];
                  setUser(userCopy);
                  setIsEdited(true);
                }}>
                <Text style={commonStyles.button_text}>Add new field</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...commonStyles.button,
                  opacity: !isDataEdited ? 0.6 : 1,
                }}
                disabled={!isDataEdited}
                onPress={() => {
                  setDraftUser(null);
                  userStore.updateUser(user.name, user);
                  setIsEdited(false);
                  setIsEditing(false);
                }}>
                <Text style={commonStyles.button_text}>Save changes</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={commonStyles.button}
              onPress={() => {
                setDraftUser(JSON.parse(JSON.stringify(user)));
                setIsEditing(true);
              }}>
              <Text style={commonStyles.button_text}>Edit profile</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
