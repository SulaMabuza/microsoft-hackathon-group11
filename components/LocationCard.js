import {View, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SelectList from 'react-native-dropdown-select-list';
import {ChevronDownIcon} from 'react-native-heroicons/outline';

const LocationCard = ({key,title}) =>{
	return(
		<TouchableOpacity>
			{/*<Image source={{
				uri: imgUrl,
			}}
			className="h-5 w-5"
			/>*/}

			<Text className="font-bold text-xs"> {title} </Text>

		</TouchableOpacity>

		)
}

export default LocationCard;