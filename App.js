import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable } from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Primera Tarea',
  },
  {
    id: '2',
    title: 'Segunda Tarea',
  },
  {
    id: '3',
    title: 'Tercera Tarea',
  },
  {
    id: '4',
    title: 'Primera Tarea',
  },
  {
    id: '5',
    title: 'Segunda Tarea',
  },
  {
    id: '6',
    title: 'Tercera Tarea',
  },
  {
    id: '7',
    title: 'Primera Tarea',
  },
  {
    id: '8',
    title: 'Segunda Tarea',
  },
  {
    id: '9',
    title: 'Tercera Tarea',
  },
  {
    id: '10',
    title: 'Primera Tarea',
  },
  {
    id: '11',
    title: 'Segunda Tarea',
  },
  {
    id: '12',
    title: 'Tercera Tarea',
  },
];

const Item = ({ title }) => (
  <View 
  style={styles.item}
  onPress={() => console.log(title)}
  >
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#4157FA',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: 'white',
  },
});

export default App;