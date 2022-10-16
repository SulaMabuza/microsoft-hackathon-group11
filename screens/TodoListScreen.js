import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, 
    Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Task from '../components/Task';
import { XCircleIcon } from 'react-native-heroicons/solid';
import firebase from '../firebase';

const TodoList = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const navigation = useNavigation();
  const [vaccineName, setVaccineName] = useState();

  const [lastOrder, setLastOrder] = useState([]);
  const todoRef = firebase.firestore().collection('bookings');


  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  //firebase stuff

  useEffect( () => {
    const db = firebase.firestore();
    db.collection('bookings')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        const obj = Object.assign({}, doc.data().items);
        const secObj = Object.assign({}, obj['0'])
        let taskString = (secObj['name'] + ' at ' + doc.data().facilityName + ' schedule: ' + doc.data().date.toDate());
        setTaskItems([...taskItems, taskString])
        
      });
    });

  }, [])

  //console.log(taskItems)
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
        <ScrollView>
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

        </View>
        </ScrollView>

      </View>

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
  button: {
    width: 250,
    alignItems: 'center',
    backgroundColor: "#00CCBB",
    borderRadius: 10,
    height: 50,
    paddingTop: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },

});
