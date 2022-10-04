import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimeSelect = () =>{
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
	const [text, setText] = useState('Empty');

	const onChange = (event, selectedDate) =>{
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);

		let tempDate = new Date(currentDate);
		let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
		let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
		setText(fDate + '\n' + fTime)

		console.log(fDate + ' (' + fTime + ')')

	}

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	}
	return(
		<View style={styles.container}>
			<Text style={{fontWeight: 'bold', fontSize: 20}}> {text} </Text>
			<View>
				<Button title='DatePicker' onPress={() => showMode('date')}/>
			</View>

			<View style={{margin:20}}>
				<Button title='TimePicker' onPress={() => showMode('time')} />
			</View>

			{show&& (
				<DateTimePicker
					testID= 'dateTimePicker'
					value={date}
					mode={mode}
					is24Hour={true}
					display='default'
					onChange={onChange}
					style={{width: 320, backgroundColor: 'white'}}
				/>

				)}
		</View>

		)
}


export default DateTimeSelect;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})