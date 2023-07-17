import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";

export default function Add() {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	if (hasPermission === null) {
		return <View></View>;
	}
	if (hasPermission === false) {
		return <Text>Permission not granted to access camera</Text>;
	}

	function toggleCameraType() {
		setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Camera style={{ flex: 1 }} type={type}>
				<View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row" }}>
					<TouchableOpacity
						style={{
							flex: 0.1,
							alignSelf: "flex-end",
							alignItems: "center",
						}}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					>
						<Text style={{ fontSize: 10, marginBottom: 20, marginLeft: 20, color: "white" }}>
							Flip
						</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</SafeAreaView>
	);
}
