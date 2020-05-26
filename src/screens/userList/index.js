import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import userStore from '../../userStore';
import UserListItem from '../../components/userListItem';

export default function UserListScreen({navigation}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await userStore.getAll();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={users}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <UserListItem
            username={item}
            onPress={() => {
              navigation.navigate('UserDetails', {username: item});
            }}
          />
        )}
      />
    </View>
  );
}
