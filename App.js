import React, {useEffect, useMemo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './src/authContext';
import UserStore from './src/userStore';
import {colors, common as commonStyles} from './src/styles/common';

import LoadingScreen from './src/screens/loading';
import LoginScreen from './src/screens/login';
import UserListScreen from './src/screens/userList';
import ProfileScreen from './src/screens/profile';
import UserDetailsScreen from './src/screens/userDetails';

export default function App() {
  const initialLoginState = {
    isLoading: true,
    username: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          username: action.username,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          username: null,
          isLoading: false,
        };
      case 'SIGNUP':
        return {
          ...prevState,
          username: action.username,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = useMemo(() => {
    return {
      logIn: async username => {
        try {
          const userExists = await UserStore.userExists(username);
          if (userExists) {
            UserStore.setLoggedUser(username);
            let userData = await UserStore.getUser(username);
            if (userData) {
              dispatch({type: 'LOGIN', username, user: userData});
            }
          }
        } catch (e) {
          console.log(e);
        }
      },
      logOut: async () => {
        UserStore.unsetLoggedUser();
        dispatch({type: 'LOGOUT'});
      },
      signUp: async username => {
        try {
          const userExists = await UserStore.userExists(username);
          if (!userExists) {
            const userData = await UserStore.newUser(username);
            UserStore.setLoggedUser(username);
            dispatch({type: 'SIGNUP', username, user: userData});
          }
        } catch (e) {
          console.log(e);
        }
      },
    };
  }, []);

  useEffect(() => {
    const autoLoginUser = async () => {
      const username = await AsyncStorage.getItem('loggedUser');
      if (username) {
        authContext.logIn(username);
      } else {
        authContext.logOut();
      }
    };
    const runInitialTasks = async () => {
      await UserStore.fillInitialUsers();
      await autoLoginUser();
    };

    runInitialTasks();
  }, []);

  const Tab = createBottomTabNavigator();

  const UserListStack = createStackNavigator();
  function UserListStackScreen() {
    return (
      <UserListStack.Navigator>
        <UserListStack.Screen
          name="UserList"
          component={UserListScreen}
          options={{headerShown: false}}
        />
        <UserListStack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={({route}) => ({title: route.params.username})}
        />
      </UserListStack.Navigator>
    );
  }

  const ProfileStack = createStackNavigator();
  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: loginState.username,
            headerRight: () => (
              <View style={{marginRight: 16}}>
                <TouchableOpacity
                  style={commonStyles.button}
                  onPress={authContext.logOut}>
                  <Text style={commonStyles.button_text}>Logout</Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </ProfileStack.Navigator>
    );
  }

  return (
    <AuthContext.Provider
      value={{auth: authContext, username: loginState.username}}>
      <NavigationContainer>
        {loginState.isLoading ? (
          <LoadingScreen />
        ) : loginState.username === null ? (
          <LoginScreen />
        ) : (
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: colors.shasta,
              inactiveTintColor: 'gray',
            }}
            screenOptions={({route}) => ({
              tabBarIcon: ({color}) => {
                const ICONS = {
                  Users: 'list',
                  Profile: 'face',
                };

                return (
                  <Icon name={ICONS[route.name]} size={25} color={color} />
                );
              },
            })}>
            <Tab.Screen name="Users" component={UserListStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
