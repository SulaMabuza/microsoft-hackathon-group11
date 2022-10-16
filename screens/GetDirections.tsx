import React, {useState, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from '../environments';
import Constants from 'expo-constants';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  StarIcon,
  MapPinIcon,   
    } from 'react-native-heroicons/solid';


const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA  * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 40.767110,
  longitude: -73.979704,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

type InputAutocompleteProps = {
  label: string;
  placeholder: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};

function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}: InputAutocompleteProps) {
  return(
    <>
      <Text> {label} </Text>
        <GooglePlacesAutocomplete
                styles={{ textInput: styles.input}}
                placeholder={placeholder || ""}
                fetchDetails
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  onPlaceSelected(details)
                }}
                query={{
                  key: GOOGLE_API_KEY,
                  language: 'pt-BR',
                }}
          />
    </>
    )

}

const GetDirections = ({route}) => {
  const [origin, setOrigin] = useState<LatLng | null>();
  //const [destination, setDestination] = useState <LatLng | null>();
  const [destination, setDestination] = useState({latitude: route.params.lat, longitude: route.params.long})
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef <MapView>(null); //step 1
  const navigation = useNavigation();
  //const facilityName = route.params.title;

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera()
    if(camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, {duration: 1000})
    }
  };

  const edgePaddingValue = 70 //step 2

  const edgePadding={
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  }

  const traceRouteOnReady = (args: any) => { //step 4
    if(args){
      setDistance(args.distance)
      setDuration(args.duration)
    }
  }

  const traceRoute= () => { //step 3
    if(origin && destination) {
      setShowDirections(true)
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding})
    }
  }

  const onPlaceSelected = ( //step important
    details: GooglePlaceDetail | null, 
    flag: "origin" | "destination"
  ) => {
    const set = flag === "origin" ? setOrigin : setDestination
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    }
    set(position);
    moveTo(position);
  };

  console.log(route.params.title);
  return (
    <View style={styles.container}>
      <MapView
          ref={mapRef} 
          style={styles.map} 
          provider={PROVIDER_GOOGLE} 
          initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin}/>}
        {destination && <Marker coordinate={destination}/>}
        {showDirections && origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_API_KEY}
              strokeColor="#6644ff"
              strokeWidth={4}
              onReady={traceRouteOnReady}
            />
          )
        }
      </MapView>
      <View style={styles.searchContainer}>

        <InputAutocomplete label="Origin" onPlaceSelected={(details) =>{
          onPlaceSelected(details, "origin")
        }} />

        <View>
            <Text>Destination</Text>
            <Text>{route.params.title}</Text>
        </View>
        {/*
        <InputAutocomplete label="Destination" onPlaceSelected={(details) => {
          onPlaceSelected(details, 'destination')
        }} />
        */
        }

        <TouchableOpacity 
            style={styles.button} 
            //onPress={() => setShowDirections(true)}
            onPress={traceRoute}
        >
          <Text style={styles.buttonText}>Trace Route</Text>
        </TouchableOpacity>
        {distance && duration ?
          (<View>
            <Text>Distance: {(distance * 1.60934).toFixed(2)} km</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
          </View>
          ) : null
        }

      </View>

        <TouchableOpacity 
            onPress = {navigation.goBack}
            className="absolute bottom-5 left-5 p-2 bg-white rounded-full">
          <ArrowLeftIcon size={25} color="#00CCBB"/>
        </TouchableOpacity>

    </View>
  );
}
export default GetDirections;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer:{
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#00CCBB',
    paddingVertical: 8,
    marginTop: 16,
    borderRadius: 4
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  }

});