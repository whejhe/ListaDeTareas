import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const obtenerTareas = async () => {
      const tareasAlmacenadas = await cargarTareas();
      if (tareasAlmacenadas) {
        setTareas(tareasAlmacenadas);
      }
    };
    obtenerTareas();
  }, []);

  const añadirtarea = () => {
    if (tarea.length > 0) {
      const nuevasTareas = [...tareas, {
        //key: Math.random().toString(),
        key: Date.now().toString(),
        text: tarea,
        completed: false,
      }];
      setTareas(nuevasTareas);
      setTarea(''); // Limpia el input después de añadir una nueva tarea
      guardarTareas(nuevasTareas);
    }
  };

  const completarTarea = (id) => {
    const nuevasTareas = tareas.map((item) => item.key === id ? { ...item, completed: !item.completed } : item);
    setTareas(nuevasTareas);
    guardarTareas(nuevasTareas);
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter((item) => item.key !== id);
    setTareas(nuevasTareas);
    guardarTareas(nuevasTareas);
  };

  const guardarTareas = async (tareas) => {
    try {
      const jsonValue = JSON.stringify(tareas);
      await AsyncStorage.setItem('@tareas', jsonValue);
    } catch (e) {
      console.error("Error al guardar las tareas", e);
    }
  };

  const cargarTareas = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tareas');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error al cargar las tareas", e);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Lista de Tareas</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe una tarea"
        onChangeText={setTarea}
        value={tarea}
      />

      {/*Button esta deprecated asi que se usa Pressable */}
      <Pressable style={styles.pressable} onPress={añadirtarea}>
        <Text style={styles.pressableText}>Añadir Tarea</Text>
      </Pressable>

      <FlatList
        data={tareas}
        renderItem={({ item }) => (
          <View style={styles.tareaContainer}>
            <Text
              style={[
                styles.tareaText,
                { textDecorationLine: item.completed ? 'line-through' : 'none' },
              ]}
            >
              {item.text}
            </Text>
            
            {/*<View style={styles.actions}>
              <TouchableOpacity onPress={() => completarTarea(item.key)}>
                <Text style={styles.completeButton}>
                  {item.completed ? 'Desmarcar' : 'Completar'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => eliminarTarea(item.key)}>
                <Text style={styles.deleteButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>*/}

            {/*TouchableOpacity esta deprecated asi que se usa Pressable*/}
            <View style={styles.actions}>
              <Pressable onPress={() => completarTarea(item.key)}>
                <Text style={styles.completeButton}>
                  {item.completed ? 'Desmarcar' : 'Completar'}
                </Text>
              </Pressable>
              <Pressable onPress={() => eliminarTarea(item.key)}>
                <Text style={styles.deleteButton}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    textDecorationLine: 'underline',
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  pressable: {
    backgroundColor: '#7b28ac',
    border: '2px solid black',
    padding: 10,
    borderRadius: 5,
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 20,
  },
  pressableText: {
    color: 'white',
    fontSize: 18,
  },
  tareaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#a8a8a8',
  },
  tareaText: {
    fontSize: 20,
  },
  actions: {
    flexDirection: 'row',
  },
  completeButton: {
    marginRight: 10,
    color: 'green',
  },
  deleteButton: {
    color: 'red',
  },
});
