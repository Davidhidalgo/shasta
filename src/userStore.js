import AsyncStorage from '@react-native-community/async-storage';
import {useState, useEffect} from 'react';
import defaultProfilePhoto from './images/defaultProfilePhoto';

const DEFAULT_USERS = [
  'David',
  'Harry',
  'Martine',
  'Isaias',
  'Richelle',
  'Nelda',
  'Blake',
  'Danielle',
  'Cythia',
  'Cristine',
  'Ingrid',
  'Debera',
  'Michaele',
  'Genna',
  'Elanor',
  'Earnest',
  'Lashay',
  'Mora',
  'Jesusita',
  'Fatima',
  'Doris',
];

class UserStore {
  useUserPhoto(username, isPhotoUpdated = true) {
    const [userPhoto, setUserPhoto] = useState(defaultProfilePhoto);

    useEffect(() => {
      const fetchUserPhoto = async () => {
        const photo = await this.getUserPhoto(username);
        console.log(photo);
        setUserPhoto(photo || defaultProfilePhoto);
      };
      fetchUserPhoto();
    }, [username, isPhotoUpdated]);

    return [userPhoto, setUserPhoto];
  }

  useUser(username) {
    const [user, setUser] = useState({});
    useEffect(() => {
      const fetchUser = async () => {
        const userData = await this.getUser(username);
        setUser(userData);
      };
      fetchUser();
    }, [username]);

    return [user, setUser];
  }

  async getAll() {
    const userListData = await AsyncStorage.getItem('userList');
    const userList = JSON.parse(userListData || '[]');
    return userList.sort();
  }

  async getUser(username) {
    const userData = await AsyncStorage.getItem(`user_${username}`);
    return JSON.parse(userData);
  }

  async updateUser(username, userData) {
    await AsyncStorage.setItem(`user_${username}`, JSON.stringify(userData));
  }

  async userExists(username) {
    const userList = await this.getAll();
    return userList.includes(username);
  }

  async setLoggedUser(username) {
    await AsyncStorage.setItem('loggedUser', username);
  }

  async unsetLoggedUser() {
    this.setLoggedUser('');
  }

  async newUser(username) {
    let users = await this.getAll();
    let userData = {name: username, data: []};
    users.push(username);
    await this.updateUser(username, userData);
    await AsyncStorage.setItem('userList', JSON.stringify(users));
    return userData;
  }

  async updateUserPhoto(username, imageBase64) {
    await AsyncStorage.setItem(`photo_${username}`, imageBase64);
  }

  async getUserPhoto(username) {
    return await AsyncStorage.getItem(`photo_${username}`);
  }

  async fillInitialUsers() {
    const isFilledOut = await AsyncStorage.getItem('isDefaultUsersFilledOut');
    if (isFilledOut !== 'true') {
      for (const username of DEFAULT_USERS) {
        AsyncStorage.setItem(
          `user_${username}`,
          JSON.stringify({
            name: username,
            data: [
              {name: 'Surname', value: 'Hidalgo'},
              {name: 'Age', value: '33'},
            ],
          }),
        );
      }
      await AsyncStorage.setItem('userList', JSON.stringify(DEFAULT_USERS));
      await AsyncStorage.setItem('isDefaultUsersFilledOut', 'true');
    }
  }
}

export default new UserStore();
