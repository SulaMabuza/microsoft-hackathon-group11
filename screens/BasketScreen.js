import { View, 
		Text, 
		TouchableOpacity, 
		SafeAreaView, 
		Image, 
		ScrollView,
		Button,
		Platform } from 'react-native';
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { selectFacility } from '../features/facilitySlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasketItems, removeFromBasket, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from "../sanity";
import {SendEmail} from "../components/SendEmail";
import Currency from "react-currency-formatter";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/CustomButton';
import firebase, { auth } from '../firebase';


const BasketScreen = () => {
	const navigation = useNavigation();
	const facility = useSelector(selectFacility);
	const items = useSelector(selectBasketItems);
	const basketTotal = useSelector(selectBasketTotal);
	const [enableBookButton, setEnableBookButton] = useState(0);
	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
	const [bookedItems, setBookedItems] = useState([]);
	const dispatch = useDispatch();


	useEffect(() => {
		{/*grouping them s it does not repeat same name*/}
		const groupedItems = items.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			setBookedItems([...bookedItems, item?.name])
			return results;
		}, {});

		setGroupedItemsInBasket(groupedItems);
		
	}, [items])

	{/*Date and Time section*/}
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
	const [text, setText] = useState('Not Scheduled');
	const [allowBooking, setAllowBooking] = useState(true);

	const onChange = (event, selectedDate) =>{
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);

		let tempDate = new Date(currentDate);
		let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
		let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();

		if(tempDate.getHours() > 8 && tempDate.getHours() < 17){
			setText(fDate + '\n' + fTime)
			setAllowBooking(false); //allow to book if time selected right
		} else{
			setText(fDate + '\n' + 'Select Time Between 8am and 5pm')
			
		}

		console.log(fDate + ' (' + fTime + ')')

	}

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	}	

	//firebase stuff
	const addBookingToFireBase = () => {

		const db = firebase.firestore();
		db.collection("bookings").add({
			facilityName: facility.title,
			total: basketTotal,
			date: date,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			groupedItemsInBasket,
		});
		navigation.navigate('PreparingOrderScreen');
		sendEmailToFacility();
	};

	// const send booking to facility 
	const sendEmailToFacility = () => {
		const emailaddress = facility.emailaddress
		const user = auth.currentUser?.email
		const vaccines = JSON.stringify(bookedItems);

		SendEmail(
			emailaddress, `Vaccination Booking for ${text}`, `I would like to schedule
			for the following vaccines: \n ${vaccines} \n
				\n Please contact me on ${user}`,
				{cc: `${user}`}
			).then(() => {
				console.log('Your message was successfully sent!'); 
				setBookedItems([]);//clearing the list afterwards
			})
	}
	//console.log(vaccines);
	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 bg-gray-100">
				<View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
					<View>
						<Text className="text-lg font-bold text-center"> Vaccine Cart </Text>
						<Text className="text-center text-gray-400">
							{facility.title}
						</Text>
					</View>

					<TouchableOpacity
						onPress={navigation.goBack}
						className="rounded-full bg-gray-100 absolute top-3 right-5"
					>
						<XCircleIcon color="#00CCBB" height={50} width={50} />
					</TouchableOpacity>
				</View>

				<View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
					<Image source={{
						uri: "https://links.papareact.com/wru",
					}}
					className='h-7 w-7 bg-gray-300 p-4 rounded-full'
					/>
					<Text className="flex-1">Vaccination between {facility.vaccinationschedule}</Text>
					<TouchableOpacity
						onPress = {() => navigation.navigate("Home")}
					>
						<Text className="text-[#00CCBB]">Change</Text> 
					</TouchableOpacity>
				</View>

				<ScrollView className="divide-y divide-gray-200">
					{Object.entries(groupedItemsInBasket).map(([key, items]) =>(
						<View 
							key={key} 
							className="flex-row items-center space-x-3 bg-white py-2 px-5"
						> 
							<Text className="text-[#00CCBB]">{items.length} x</Text>
							<Image 
								source={{uri: urlFor(items[0]?.image).url()}}
								className="h-12 w-12 rounded-full"
							/>

							<Text className="flex-1">{items[0]?.name}</Text>

							<Text className="text-gray-600">
								<Currency quantity={items[0]?.price} currency="NGN" />
								
							</Text>

							<TouchableOpacity>
								<Text
									className="text-[#00CCBB] text-xs"
									onPress={() => dispatch(removeFromBasket({ id: key}))}
								>
									Remove
								</Text>
							</TouchableOpacity>
						</View>
						
						))}
				{/*display date and time selection*/}

				<TouchableOpacity>
					<CustomButton 
						text={'Schedule Date'}
						onPress={() => showMode('date')}
						bgColor={'#00CCBB'}
						fgColor={'white'}
					/>
				</TouchableOpacity>

				<TouchableOpacity>
					<CustomButton 
						text={'Schedule Time'}
						onPress={() => showMode('time')}
						bgColor={'#00CCBB'}
						fgColor={'white'}
					/>
				</TouchableOpacity>

				<View >
					{show&& (
						<DateTimePicker
							testID= 'dateTimePicker'
							value={date}
							mode={mode}
							is24Hour={true}
							display='default'
							onChange={onChange}
							minimumDate={new Date()}
							style={{width: '100%', backgroundColor: 'white'}}
						/>

						)}
				</View>

				{/*End of Display Date and Time*/}

				</ScrollView>

				<View className="p-5 bg-white mt-5 space-y-4">
					<View className="flex-row justify-between">
						<Text className="text-gray-400">Subtotal</Text>
						<Text className="text-gray-400">
							<Currency quantity={basketTotal} currency="NGN" />
						</Text>
					</View>

					<View className="flex-row justify-between">
						<Text className="text-gray-400">Service Fee</Text>
						<Text className="text-gray-400">
							<Currency quantity={5.99} currency="NGN" />
						</Text>
					</View>

					<View className="flex-row justify-between">
						<Text>Booking Total</Text>
						<Text className="font-extrabold">
							<Currency quantity={basketTotal + 5.99} currency="NGN" />
							
						</Text>
					</View>

				{/*display selection of date and time*/}
					<View>
						<Text>{text}</Text>
					</View>


					<TouchableOpacity
						disabled = {allowBooking}
						onPress={() => addBookingToFireBase}
						className="rounded-lg bg-[#00CCBB] p-4"
					>
						<Text className="text-center text-white text-lg font-bold">
							Book
						</Text>
					</TouchableOpacity>

				</View>
			</View>
		</SafeAreaView>
		);
};

export default BasketScreen;