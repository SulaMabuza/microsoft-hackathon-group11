import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, 
    Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from '../components/Task';
import { XCircleIcon } from 'react-native-heroicons/solid';

const TodoList = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const navigation = useNavigation();

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems,task])
    setTask(null);
     
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/*Today's Tasks*/}
      <View style= {styles.tasksWrapper}>
                  <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-10 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        <Text style={styles.sectionTitle}> Pending Tasks </Text>
        <View style={styles.items}>
          {/*This is where the tasks will go!*/}
          {
            taskItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task  text={item} />
                </TouchableOpacity>
              )
            })

          }

          {/*<Task text={'Task 1'} />
          <Task text={'Task 2'}/>*/}


        </View>

      </View>

     {/*write a task section*/}
     <KeyboardAvoidingView
        behavior={Platform.OS=='ios' ? 'padding' : 'height' }
        style={styles.writeTaskWrapper}
     >
      <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text=>setTask(text)} />
      <TouchableOpacity 
        onPress={() => handleAddTask()}> 
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
     </KeyboardAvoidingView>

    </View>
  );
}

export default TodoList; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',

  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 13,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,

  },
  addText: {},

});
