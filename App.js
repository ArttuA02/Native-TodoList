import { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import React from 'react';
import Row from './Row';
import Add from './Add';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items_key'
const SELECTED_STORAGE_KEY = '@selected_items_key';

const storeData = async(value, key) => {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(key, json)
    } catch (ex) {
      console.log(ex)
    }
  }

export default function App() {
  const [data, setData] = useState([])
  const [selectedId, setSelectedId] = useState([])

  useEffect(() => {
    getData()
    getSelectedIds()
  }, [])
  
  useEffect(() => {
    storeData(data, STORAGE_KEY)
  }, [data])

  useEffect(() => {
    storeData(selectedId, SELECTED_STORAGE_KEY)
  }, [selectedId])

  const add = useCallback((name) => {
    const newItem = {
      id: uuid.v4(),
      name: name
    };
    setData((prevData) => [...prevData, newItem])
  }, []);

  const select = (id) => {
    setSelectedId((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(selectedId => selectedId !== id)
      } else {
        return [...prevSelected, id]
      }
    });
  };
  
  const getData = async() => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY)
    const json = JSON.parse(value) || []
    if (json === null) {
      json = []
    }
    setData(json)
  } catch (ex) {
    console.log(ex)
  }
}

  const getSelectedIds = async () => {
    try {
      const value = await AsyncStorage.getItem(SELECTED_STORAGE_KEY);
      const json = JSON.parse(value) || [];
      setSelectedId(json);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.container}>Todo list</Text>
        <Add add={add} />
        <FlatList 
          data={data}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          renderItem={({ item }) => (
            <Row
              item={item}
              selectedId={selectedId}
              select={select}
              data={data}
              setData={setData} 
            />
          )}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
