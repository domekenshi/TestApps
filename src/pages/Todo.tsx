import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, StyleSheet} from 'react-native';
import AddBtn from '../atoms/btn/AddBtn';
import DelBtn from '../atoms/btn/DelBtn';

const Todo = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, task]);
    setTask('');
  };

  const delTask = index => {
    const newOutputTxts = tasks.filter((_, idx) => idx !== index);
    setTasks(newOutputTxts);
  };

  const renderTask = ({item, index}) => {
    return (
      <View style={styles.renderItemBox}>
        <View style={styles.task}>
          <Text style={styles.taskText}>{item}</Text>
        </View>
        <View style={styles.delbtnBox}>
          <DelBtn
            onPress={() => {
              delTask(index);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDoリスト</Text>
      <TextInput
        style={styles.input}
        placeholder="タスクを入力してください"
        value={task}
        onChangeText={setTask}
      />
      <AddBtn onPress={addTask} />
      <FlatList
        data={tasks}
        style={styles.flatList}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  task: {
    flex: 3,
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    marginRight: 30,
  },
  taskText: {
    fontSize: 18,
  },
  btnBox: {
    width: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderItemBox: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  delbtnBox: {
    marginTop: 10,
    flex: 1,
  },
  flatList: {
    marginTop: 15,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
});

export default Todo;
