import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export const CustomInput = ({value, setValue, placeholder, secureTextEntry}) =>{
	return(
		<View style={styles.container}>
			<TextInput 
				value={value}
				onChangeText = {setValue}
				placeholder ={placeholder}
				style={styles.input} 
				secureTextEntry={secureTextEntry}
			/>
		</View>

		);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		width: '100%',
		height: 40,
		paddingTop: 10,
		

		borderColor: '#e8e8e8',
		borderWidth: 1,
		borderRadius: 5,

		paddingHorizontal: 10,
		marginVertical: 5,
	},
	input: {},
});
export default CustomInput;