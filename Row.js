import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Row({item, selectedId, select, data, setData}) {
  const isSelected = selectedId.includes(item.id)
  
  return (
    <Pressable style={[styles.row]} onPress={() => select(item.id)}>
        <Text style={[styles.rowText, isSelected && styles.lineThrough]}>{item.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowText: {
    fontSize: 16,
    padding: 4,
    margin: 4,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    
  }
});