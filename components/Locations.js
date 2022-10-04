import {View, Image, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import LocationCard from './LocationCard';
import sanityClient, { urlFor } from '../sanity';
import SelectList from 'react-native-dropdown-select-list';
import {ChevronDownIcon} from 'react-native-heroicons/outline';

const Location = () =>{
	const [locations, setLocations] = useState([]);
	const [selected, setSelected] = useState();
	

	useEffect(() => {
		sanityClient.fetch(
			`*[_type == "location"]
			`).then((data) => {
				setLocations(data);
			});

	}, [])

	console.log(locations);

	return(
		<View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
			<SelectList
				data= {locations.map((location) => (
						<LocationCard 
							key = {location._id}
							title={location.name}
						/>
						))}
				setSelected={setSelected} 
				arrowicon = {<ChevronDownIcon size={15} color='#00CCBB' />}
			/>
		</View>
		)
}

export default Location;