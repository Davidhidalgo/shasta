import React, {useState, useContext} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../authContext';
import styles from './styles';
import {common as commonStyles} from '../../styles/common';

export default function LoginScreen() {
  const [username, setUsername] = useState('David');
  const [isRegistering, setIsRegistering] = useState(false);

  const {auth} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...commonStyles.inputText,
          ...styles.inputTextUsername,
        }}
        placeholder="Username"
        onChangeText={value => setUsername(value)}
      />

      {isRegistering ? (
        <View>
          <TouchableOpacity
            style={{
              ...commonStyles.button,
              ...styles.registerButton,
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
        <View styles={styles.loginWrapper}>
          <TouchableOpacity
            style={{
              ...commonStyles.button,
              ...styles.loginButton,
            }}
            onPress={() => auth.logIn(username)}>
            <Text style={commonStyles.button_text}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.or}>or</Text>

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
