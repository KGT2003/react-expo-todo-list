import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { ThemeProvider, Text, Input, Button, CheckBox } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: "1", description: "Complete resume", completed: false },
    { key: "2", description: "Go to the gym", completed: true },
    { key: "3", description: "Apply for Job Internship", completed: false },
  ]);

  const [newTask, setNewTask] = useState('');


  const toggleTask = (key) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.key === key
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newItem = {
      key: Date.now().toString(),
      description: newTask,
      completed: false,
    };

    setTasks([...tasks, newItem]);
    setNewTask('');
  };
  const deleteAllTasks = () => {
    setTasks([]);
    setDeleteAll('');
  };

  const renderItem = ({ item }) => (
    <CheckBox
      title={
        <Text style={item.completed ? styles.completedText : styles.normalText}>
          {item.description}
        </Text>
      }
      checked={item.completed}
      onPress={() => toggleTask(item.key)}
    />
  );

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.headerText}>My Todo List</Text>

        <Input
          placeholder="Enter a task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />

        <Button title="Add" onPress={addTask} />
        <Button title="Delete All" onPress={deleteAllTasks} containerStyle={{ marginTop: 10 }} />


        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />

        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  normalText: {
    textDecorationLine: 'none',
    color: 'black',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
  },
});