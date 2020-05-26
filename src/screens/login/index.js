import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../../authContext';
import {common as commonStyles} from '../../styles/common';

const width = Dimensions.get('window').width;

export default function LoginScreen() {
  const [username, setUsername] = useState('David');
  const [isRegistering, setIsRegistering] = useState(false);

  const {auth} = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
      }}>
      <TextInput
        style={{
          ...commonStyles.inputText,
          textAlign: 'center',
          width: width * 0.6,
        }}
        placeholder="Username"
        onChangeText={value => setUsername(value)}
      />

      {isRegistering ? (
        <View styles={{width: width * 0.6}}>
          <TouchableOpacity
            style={{
              ...commonStyles.button,
              width: width * 0.6,
              marginBottom: 8,
            }}
            onPress={() => auth.signUp(username)}>
            <Text style={commonStyles.button_text}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={commonStyles.link}
            onPress={() => setIsRegistering(false)}>
            <Text style={commonStyles.link_text}>Return to login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          styles={{
            width: width * 0.6,
          }}>
          <TouchableOpacity
            style={{
              ...commonStyles.button,
              width: width * 0.6,
              marginBottom: 8,
            }}
            onPress={() => auth.logIn(username)}>
            <Text style={commonStyles.button_text}>Login</Text>
          </TouchableOpacity>

          <Text style={{alignSelf: 'center', color: '#777', fontSize: 12}}>
            or
          </Text>

          <TouchableOpacity
            style={commonStyles.link}
            onPress={() => setIsRegistering(true)}>
            <Text style={commonStyles.link_text}>Signup on Shasta</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
