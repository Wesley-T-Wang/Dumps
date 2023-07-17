import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	useWindowDimensions,
	FlatList,
	Button,
	TextInput,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS, SIZES } from "../../assets/themes/theme";
import { photos } from "../../assets/images/profilePhotos/defaultPhotos";
import images from "../../assets/images/profilePhotos/images";

export default function EditProfile(props) {
	// these will change as we get user data
	// we will also have to update user data from here
	const [selectedImage, setSelectedImage] = useState(
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAbBB_oglMX609dUtMkvQcL3nmKuqOQmVfR2VIj0he6Q&s"
	);
	const [name, setName] = useState("username");
	const [email, setEmail] = useState("user@email.com");
	const [password, setPassword] = useState("someencryptedthing");
	const [country, setCountry] = useState("USA");
	var n = "";

	const handleImageSelection = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		}
	};

	return (
		<Modal
			isVisible={props.isModalVisible}
			animationType="slide"
			transparent={false}
			style={{
				margin: 0,
				flex: 1,
				shadowColor: "#000",
			}}
		>
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 22 }}>
				<View style={{ marginHorizontal: 12, flexDirection: "row", justifyContent: "center" }}>
					<TouchableOpacity
						title="cancel modal"
						onPress={props.toggleModal}
						style={{ position: "absolute", left: 0 }}
					>
						<Text style={{ color: COLORS.black, fontSize: 20 }}>Cancel</Text>
					</TouchableOpacity>

					<Text style={{ color: COLORS.black, fontSize: 20, fontWeight: 600 }}>Edit Profile</Text>

					<TouchableOpacity
						title="close modal"
						onPress={props.toggleModal}
						style={{ position: "absolute", right: 0 }}
					>
						<Text style={{ color: COLORS.primary, fontSize: 20 }}> Save </Text>
					</TouchableOpacity>
				</View>
				<ScrollView>
					<View
						style={{
							alignItems: "center",
							marginVertical: 22,
						}}
					>
						<TouchableOpacity onPress={handleImageSelection}>
							<Image
								source={{ uri: selectedImage }}
								style={{
									height: 170,
									width: 170,
									borderRadius: 85,
									borderWidth: 2,
									borderColor: COLORS.primary,
								}}
							/>

							<View
								style={{
									position: "absolute",
									bottom: 0,
									right: 10,
									zIndex: 9999,
								}}
							>
								<MaterialIcons name="photo-camera" size={32} color={COLORS.primary} />
							</View>
						</TouchableOpacity>
					</View>

					<View style={{ marginVertical: 22, marginHorizontal: 12 }}>
						<View style={{ flexDirection: "column", marginBottom: 6 }}>
							<Text style={{ fontWeight: 700 }}>Name</Text>
							<View
								style={{
									height: 44,
									width: "100%",
									borderColor: COLORS.lightgray,
									borderWidth: 1,
									borderRadius: 4,
									marginVertical: 6,
									justifyContent: "center",
									paddingLeft: 8,
								}}
							>
								<TextInput
									onChangeText={(value) => (n = value)}
									onEndEditing={() => setName(n)}
									defaultValue={name}
								/>
							</View>
						</View>

						<View style={{ flexDirection: "column", marginBottom: 6 }}>
							<Text style={{ fontWeight: 700 }}>Email</Text>
							<View
								style={{
									height: 44,
									width: "100%",
									borderColor: COLORS.lightgray,
									borderWidth: 1,
									borderRadius: 4,
									marginVertical: 6,
									justifyContent: "center",
									paddingLeft: 8,
								}}
							>
								<TextInput
									onChangeText={(value) => (n = value)}
									onEndEditing={() => setEmail(n)}
									defaultValue={email}
								/>
								{console.log(name, email, password, country)}
							</View>
						</View>

						<View style={{ flexDirection: "column", marginBottom: 6 }}>
							<Text style={{ fontWeight: 700 }}>Password</Text>
							<View
								style={{
									height: 44,
									width: "100%",
									borderColor: COLORS.lightgray,
									borderWidth: 1,
									borderRadius: 4,
									marginVertical: 6,
									justifyContent: "center",
									paddingLeft: 8,
								}}
							>
								<TextInput
									onChangeText={(value) => (n = value)}
									onEndEditing={() => setPassword(n)}
									defaultValue={password}
									secureTextEntry
								/>
							</View>
						</View>

						<View style={{ flexDirection: "column", marginBottom: 6 }}>
							<Text style={{ fontWeight: 700 }}>Country</Text>
							<View
								style={{
									height: 44,
									width: "100%",
									borderColor: COLORS.lightgray,
									borderWidth: 1,
									borderRadius: 4,
									marginVertical: 6,
									justifyContent: "center",
									paddingLeft: 8,
								}}
							>
								<TextInput
									onChangeText={(value) => (n = value)}
									onEndEditing={() => setCountry(n)}
									defaultValue={country}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Modal>
	);
}
