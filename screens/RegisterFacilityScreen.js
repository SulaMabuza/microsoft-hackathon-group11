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
import { auth } from '../firebase';

const RegisterFacilityScreen = () =>{
	const [facilityName, setFacilityName] = useState('');
	const [password, setPassword] = useState('');

	const navigation = useNavigation();

	const handleRegistration = () =>{
		navigation.navigate("FacilityRegistered");
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
				onPress={onForgotPasswordPressed}
				type= "TERTIARY"
			/>

			<CustomButton 
				text={"Don't have an account? Create one"} 
				onPress={onSignUpPress}
				type= "TERTIARY"
			/>

			<CustomButton 
				text={'Register Facility'}
				onPress={handleFacilityRegistration}
				bgColor={'#00CCBB'}
				fgColor={'#FFF'}

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

export default RegisterFacilityScreen;

