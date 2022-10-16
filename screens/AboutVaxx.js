import React from 'react';
import {View, 
		Text, 
		TouchableOpacity, 
		SafeAreaView, 
		StyleSheet, 
		Image,
		useWindowDimensions} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { useRoute, useNavigation } from "@react-navigation/native";
import Logo from '../assets/images/Logo_1.png';



const AboutVaxx = ({route}) => {
	const navigation = useNavigation();
	const {height} = useWindowDimensions();

	return(
		<SafeAreaView>

		<View className="relative p-2" >
			<View style={{ zIndex:1 }}>
			<TouchableOpacity 
				onPress = {navigation.goBack}
				className="absolute top-2 left-5 p-2 bg-gray-100 rounded-full">
				<ArrowLeftIcon size={20} color="#00CCBB"/>
			</TouchableOpacity>
			</View>
			<Image 
				source={Logo} 
				style={[styles.logo, {height: height * 0.3}]} 
				resizeMode="contain"
			/>


		<View className= "bg-[#00CCBB] h-15 p-3">
			<Text 
				className="text-xl text-white text-center text-bold">
				{route.params.facilityName}</Text>
		</View>
		<View > 
			<Text className="text-justify py-2 px-2 text-gray-500" > 

				Vaccination is a simple, safe, and effective way of protecting you against 
				harmful diseases, 
				before you come into contact with them. 
				It uses your body’s natural defenses to build resistance to specific 
				infections 
				and makes your immune system stronger. Vaccines train your immune 
				system to create 
				antibodies, just as it does when it’s exposed to a disease. However, 
				because vaccines contain only killed or weakened forms of germs like 
				viruses or bacteria, 
				they do not cause the disease or put you at risk of its complications.
			</Text> 
			<Text className="text-justify py-2 px-2 text-gray-500">{route.params.aboutVaxx}</Text>
		</View>
		<View>

		</View>
	
		</View>
		</SafeAreaView>
		)
}

export default AboutVaxx;

const styles = StyleSheet.create({
	logo: {
		width: '70%',
		maxWidth: 300,
		maxHeight: 200,
		alignItems: 'center',
		padding: 20,
	},
});