import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react'

export default function Add({add}) {
  const [name, setName] = useState('')

  const save = () => {
    add(name)
    setName('')
  }

  return (
    <View style={styles.container}>
        <TextInput 
        style={styles.form} 
        value={name} 
        onChangeText={text => setName(text)} 
        placeholder="Task..."
        />
        <Button title='Save' onPress={() => save(name)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  form: {
    marginRight: 10
  }
});