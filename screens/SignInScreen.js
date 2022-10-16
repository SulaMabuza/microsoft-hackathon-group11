import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, 
		Text, 
		Image, 
		StyleSheet, 
		useWindowDimensions, 
		ScrollView,
		KeyboardAvoidingView} from 'react-native';
import Logo from '../assets/images/Logo_1.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import firebase, { auth } from '../firebase';

const SignInScreen = () =>{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigation = useNavigation();


	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user =>{
			if(user){
				navigation.replace("Home")
			}
		})
		return unsubscribe
	}, [])
	const onSignUpPress = () => {

		auth
		.createUserWithEmailAndPassword(email, password)
		.then(userCredentials =>{
			const user = userCredentials.user;
			console.log('Registered with: ',user.email);
		})
		.catch(error => alert(error.message));
		
	}

	const onSignInPressed = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then(userCredentials => {
				const user = userCredentials.user;
				console.log('Signed in with: ', user.email);
			})
			.catch(error=>alert(error.message));
	}

	const onForgotPasswordPressed = (email) =>{
		firebase.auth().sendPasswordResetEmail(email)
		.then(function(user){
			alert('Please check your email...')
		}).catch(function(e) {
			console.log(e)
		})
	}


	const {height} = useWindowDimensions();
	return(
		<ScrollView showsVerticalScrollIndicator={false}>
		<View style={styles.root}>
			<Image 
				source={Logo} 
				style={[styles.logo, {height: height * 0.3}]} 
				resizeMode="contain"
			/>

			<CustomInput 
				placeholder="email" 
				value={email} 
				setValue={setEmail}
				secureTextEntry={false}
			/> 
			<CustomInput 
				placeholder="Password" 
				value={password} 
				setValue={setPassword}
				secureTextEntry={true}
			/>

			<CustomButton text={"Sign In"} onPress={onSignInPressed}  />

			<CustomButton 
				text={"Forgot password?"} 
				onPress={onForgotPasswordPressed(email)}
				type= "TERTIARY"
			/>

			<CustomButton 
				text={"Don't have an account? Create one"} 
				onPress={onSignUpPress}
				type= "TERTIARY"
			/>



		</View>
		</ScrollView>

		);
};

const styles = StyleSheet.create({
	root:{
		alignItems: 'center',
		padding: 20,
	},
	logo: {
		width: '70%',
		maxWidth: 300,
		maxHeight: 200,
	},
});

export default SignInScreen;

