import {View, Text, 
		SafeAreaView, 
		TouchableOpacity, 
		Image,
		Linking, 
		Platform
	} from 'react-native';
import React, {Components, useEffect, useState} from 'react';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectFacility } from '../features/facilitySlice';
import { XMarkIcon } from "react-native-heroicons/solid";
import {GOOGLE_API_KEY} from "../environments.js"
import * as Progress from "react-native-progress";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import Geocoder from 'react-native-geocoding';

//geocode stuff

const DeliveryScreen = () => {
	const navigation = useNavigation();
	const facility = useSelector(selectFacility);
	const [latLong, setLatLong] = useState({});

	//call the facility stuff
	const dialCall = (number) =>{
		let phoneNumber = '';
		if(Platform.OS === 'android'){
			phoneNumber = `tel: ${number}`;
		}else{
			phoneNumber = `telprompt: ${number}`;
		}
		Linking.openURL(phoneNumber);
	}

	useEffect(() => {
		Geocoder.init(GOOGLE_API_KEY)
		Geocoder.from(facility.address)
				.then(json => {
				var location = json.results[0].geometry.location;
				setLatLong( location )
				})
				.catch(error => console.warn(error));

	}, [])

	console.log(latLong.lat)

	return(
		<View className="bg-[#00CCBB] flex-1">
			<SafeAreaView className="z-50">
				<View className="flex-row justify-between items-center p-5">
					<TouchableOpacity onPress={() => navigation.navigate("Home")}>
						<XMarkIcon color="white" size={30} />
					</TouchableOpacity >
					<TouchableOpacity 
						onPress = {() => navigation.navigate("GetDirections", {
							lat: latLong.lat,
							long: latLong.lng,
							title: facility.title,
						})}
					>
					<Text className="font-light text-white text-lg">Get Directions</Text>
					</TouchableOpacity>
				</View>

				<View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
					<View className="flex-row justify-between">
						<View>
							<Text className="text-lg text-gray-400">Good to Go</Text>
							<Text className="text-4xl font-bold">Hooray!</Text>
						</View>

						<Image 
							source={{
								uri: "https://links.papareact.com/fls",
							}}
							className="h-20 w-20"
						/>

					</View>

					<Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

					<Text className="mt-3 text-gray-500">
						Your vaccine request at {facility.title} has been processed
					</Text>
				</View>
			</SafeAreaView>
			{ latLong.lat !== undefined &&
					<MapView
						initialRegion={{
							latitude: latLong.lat,
							longitude: latLong.lng,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						}}
						className="flex-1 -mt-10 z-0"
						mapType="mutedStandard"
						provider={PROVIDER_GOOGLE}
					>
					<Marker
						coordinate={{
							latitude: latLong.lat,
							longitude: latLong.lng
						}}
						title={facility.title}
						description={facility.short_description}
						identifier="origin"
						pinColor = "#00CCBB"
					/>
					</MapView>
		}

			<SafeAreaView className='bg-white flex-row items-center space-x-5 h-28'>
				<Image
					source={{
						uri: "https://links.papareact.com/wru",
					}}
					className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
				/>

				<View className="flex-1">
					<Text className="text-lg">mDoc</Text>
					<Text className="text-gray-400">Your Provider</Text>
				</View>
				<TouchableOpacity
					onPress={() => {dialCall(facility.phonenumber)}}
				>
				<Text className='text-[#00CCBB] text-lg mr-5 font-bold'>Call</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</View>
		)
}

export default DeliveryScreen;