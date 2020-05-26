import React from 'react';
import {TextInput, View, Text} from 'react-native';
import styles from './styles';

export default function UserValueItem({
  name,
  value,
  isEditing = false,
  onUpdate = () => {},
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputNameContainer}>
        {isEditing ? (
          <TextInput
            style={{
              ...styles.inputText,
              fontWeight: 'bold',
            }}
            placeholder={name}
            defaultValue={name}
            onChangeText={val => onUpdate({name: val, value})}
          />
        ) : (
          <Text style={styles.textName}>{name}</Text>
        )}
      </View>
      <View style={styles.inputValueContainer}>
        {isEditing ? (
          <TextInput
            style={styles.inputText}
            placeholder={value}
            defaultValue={value}
            onChangeText={val => onUpdate({name, value: val})}
          />
        ) : (
          <Text style={styles.textValue}>{value}</Text>
        )}
      </View>
    </View>
  );
}
