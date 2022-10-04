import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {UserIcon} from 'react-native-heroicons/outline';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import CustomButton from '../components/CustomButton';
import { auth } from '../firebase';

const ProfileScreen = () => {

	const navigation = useNavigation()

	const handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				navigation.replace("Login")
			})
			.catch(error => alert(error.message))
	}

	const handleTodoList = () =>{
		navigation.navigate("TodoList");

	}

	return(

		<View style={styles.root}>
			<TouchableOpacity 
				onPress = {navigation.goBack}
				className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
				<ArrowLeftIcon size={20} color="#00CCBB"/>
			</TouchableOpacity>
			<UserIcon size={150} color='#00CCBB'/>
			<Text className="text-xs"> Signed in as </Text> 
			<Text className="text-xl"> {auth.currentUser?.email} </Text>

			<CustomButton 
				text={'Todo List'}
				onPress={handleTodoList}
				bgColor={'#00CCBB'}
				fgColor={'#FFF'}

			/>				
			<CustomButton 
				text={"SignOut"} 
				onPress={handleSignOut }
				type= "TERTIARY"
			/>

		</View>

		)
}

export default ProfileScreen;

const styles = StyleSheet.create({
	root:{
		alignItems: 'center',
		padding: 20,
		flex: 1,
		justifyContent: 'center',
	},

})