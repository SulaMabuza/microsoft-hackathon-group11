import {View, 
		Text, 
		SafeAreaView, 
		Image, 
		TextInput, 
		ScrollView, 
		TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {UserIcon, 
		ChevronDownIcon, 
		MagnifyingGlassIcon, 
		AdjustmentsVerticalIcon} from 'react-native-heroicons/outline';
import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '../environments';
import Categories from '../components/Categories.js';
import FeaturedRow from '../components/FeaturedRow.js';
import sanityClient from "../sanity";
import SearchBar from '../components/SearchBar';



const HomeScreen = () =>{
	//have a changeable headerr
	const navigation = useNavigation();
	const [featuredCategories, setFeaturedCategories] = useState([]);
	const [position, setPosition] = useState({
		latitude: 10,
		longitude: 10,
		latitudeDelta: 0.001,
		longitudeDelta: 0.001,
	});

	const [city, setCity] = useState('Yola, Nigeria');

	useLayoutEffect(()=>{
		navigation.setOptions({
			headerShown: false,
		});

	}, []);

	useEffect(() => {
		sanityClient.fetch(`
			*[_type == "featured"] {
				...,
				facilities[]->{
					...,
					vaccines[]->
				}
			}`).then(data => {
				setFeaturedCategories(data);
			});
	}, [city]);

	return (
		<SafeAreaView className='bg-white pt-5'>
				{/*Header*/}
				<View className='flex-row pb-3 items-center mx-4 space-x-2 px-4'>
					<Image
						source={{
							url:'https://links.papareact.com/wru',
						}}
						className="h7 w-7 bg-gray-300 p-4 rounded-full"
					/>

					<View className='flex-1'>
						<Text className='font-bold text-gray-400 text-xs'> Vaccinate Now! </Text>
						<Text className='font-bold text-xl'> 
							{city}
							<ChevronDownIcon size={20} color='#00CCBB' />
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate("Profile")}
					>
					<UserIcon size={35} color='#00CCBB'/>
					</TouchableOpacity>
				</View>

				{/* Search */}
				<View className="flex-row items-center space-x-2 pb-2 mx-0 px-4">
					<SearchBar 
						cityHandler={setCity}
						/>

				</View>
				{/* Body */}
				<ScrollView className='bg-gray-100'>
					{/* Categories*/}
					<Categories/>

					{/*Featured Rows*/}

					{featuredCategories?.map(category => (
						<FeaturedRow
							key={category._id}
							id={category._id}
							title={category.name}
							description={category.short_description}
							city={city}
						/>
						

						))}


				</ScrollView>

		</SafeAreaView>
		)
}

export default HomeScreen;