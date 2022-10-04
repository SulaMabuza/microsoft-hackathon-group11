import {View, Text, ScrollView} from 'react-native';
import React, { useEffect, useState }from 'react';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import FacilityCard from './FacilityCard';
import sanityClient from "../sanity";

const FeaturedRow = ({id, title, description}) =>{
	const [facilities, setFacilities] = useState([]);

	useEffect(() => {

		sanityClient.fetch(
			`*[_type == "featured" && _id ==$id]{
				...,
				facilities[]->{
					...,
					vaccines[]->,
					type->{
						name
					}
				},
			}[0]
			`
			,

			{ id }
		).then(data=>{
			setFacilities(data?.facilities);
		});
	}, [id]);


	return(
		<View>
			<View className="mt-4 flex-row items-center justify-between px-4">
				<Text className="font-bold text-lg">{title}</Text>
				<ArrowRightIcon color="#00CCBB"/>
			</View>

			<Text className="text-xs text-gray-500 px-4">{description}</Text>
			<ScrollView
				horizontal
				contentContainerStyle={{
					paddingHorizontal:15,

				}}
				showsHorizontalScrollIndicator={false}
				className="pt-4"
			>
			{/*RestaurantCards..*/}

			{facilities?.map(facility => (

				<FacilityCard
					key={facility._id}
					id={facility._id}
					imgUrl={facility.image}
					address={facility.address}
					title={facility.name}
					vaccines={facility.vaccines}
					rating={facility.rating}
					short_description={facility.short_description}
					genre={facility.type?.name}
					long={facility.long}
					lat={facility.lat}

				/>

				))}

			</ScrollView>

		</View>
		)
}

export default FeaturedRow;