import React, { Component } from "react";
import {Linking, Platform, TouchableOpacity, Text} from "react-native";

export async function DialCall(number){
	let phoneNumber = '';
	if(Platform.OS === 'android'){ phoneNumber = `tel:${number}`;}
	else {phoneNumber = `telprompt: ${number};`}
	Linking.openURL(phoneNumber);
};