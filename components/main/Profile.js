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
import { StatusBar } from "expo-status-bar";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { ScrollView } from "react-native-virtualized-view";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS, SIZES } from "../../assets/themes/theme";
import { photos } from "../../assets/images/profilePhotos/defaultPhotos";
import images from "../../assets/images/profilePhotos/images";

import EditProfile from "./EditProfile";

// get number of rows
const getHeight = photos.length / 3;
// console.log(getHeight);
// modal

const PhotosRoutes = () => (
	<View style={{ flex: 1 }}>
		<FlatList
			data={photos}
			numColumns={3}
			renderItem={({ item, index }) => (
				<View
					style={{
						flex: 1,
						aspectRatio: 1,
						margin: 3,
					}}
				>
					<Image
						key={index}
						source={item}
						style={{ width: "100%", height: "100%", borderRadius: 12 }}
					/>
				</View>
			)}
		/>
	</View>
);

const LikesRoutes = () => (
	<View style={{ flex: 1, backgroundColor: "blue" }}>
		{/* same data route for now */}
		<FlatList
			data={photos}
			numColumns={3}
			renderItem={({ item, index }) => (
				<View
					style={{
						flex: 1,
						aspectRatio: 1,
						margin: 3,
					}}
				>
					<Image
						key={index}
						source={item}
						style={{ width: "100%", height: "100%", borderRadius: 12 }}
					/>
				</View>
			)}
		/>
	</View>
);

const renderScene = SceneMap({
	first: PhotosRoutes,
	second: LikesRoutes,
});

export default function Profile() {
	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [isModalVisible, setModalVisible] = useState(false);

	const [routes] = useState([
		{ key: "first", title: "Photos" },
		{ key: "second", title: "Likes" },
	]);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const renderTabBar = (props) => (
		<TabBar
			{...props}
			indicatorStyle={{
				backgroundColor: COLORS.primary,
			}}
			style={{
				backgroundColor: COLORS.white,
				height: 44,
			}}
			renderLabel={({ focused, route }) => (
				<Text style={[{ color: focused ? COLORS.black : COLORS.gray }]}>{route.title}</Text>
			)}
		/>
	);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
			}}
		>
			<StatusBar backgroundColor={"gray"} />
			<ScrollView>
				{/* main profile items */}
				<View style={{ width: "100%" }}>
					<Image
						// user cover photo here
						source={images.cover}
						resizeMode="cover"
						style={{
							height: 228,
							width: "100%",
						}}
					/>
				</View>

				<View style={{ flex: 1, alignItems: "center" }}>
					<Image
						// user profile picture here
						source={images.pfp}
						resizeMode="contain"
						style={{
							height: 155,
							width: 155,
							borderRadius: 999,
							borderColor: COLORS.primary,
							borderWidth: 2,
							marginTop: -90,
						}}
					/>
					<Text
						style={{
							color: "black",
							marginVertical: 8,
						}}
					>
						{/* user username here */}
						Username
					</Text>
					<Text style={{ color: "black" }}>
						{/* user intro or status or summary */}
						Title or summary
					</Text>
					<View
						style={{
							flexDirection: "row",
							marginVertical: 6,
							alignItems: "center",
						}}
					>
						{/* user location (if needed) */}
						<MaterialIcons name="location-on" size={24} color={COLORS.gray} />
						<Text style={{ marginLeft: 4 }}>California, USA</Text>
					</View>

					{/* profile follower, following, posts count */}
					<View
						style={{
							paddingVertical: 4,
							flexDirection: "row",
						}}
					>
						{/* followers */}
						<View
							style={{
								flexDirection: "column",
								alignItems: "center",
								marginHorizontal: SIZES.padding,
							}}
						>
							<Text
								style={{
									color: COLORS.primary,
								}}
							>
								123
							</Text>
							<Text
								style={{
									color: COLORS.gray,
								}}
							>
								Followers
							</Text>
						</View>

						{/* following */}
						<View
							style={{
								flexDirection: "column",
								alignItems: "center",
								marginHorizontal: SIZES.padding,
							}}
						>
							<Text
								style={{
									color: COLORS.primary,
								}}
							>
								321
							</Text>
							<Text
								style={{
									color: COLORS.gray,
								}}
							>
								Following
							</Text>
						</View>

						{/* likes? posts? */}
						<View
							style={{
								flexDirection: "column",
								alignItems: "center",
								marginHorizontal: SIZES.padding3 + 4,
							}}
						>
							<Text
								style={{
									color: COLORS.primary,
								}}
							>
								111
							</Text>
							<Text
								style={{
									color: COLORS.gray,
								}}
							>
								Posts
							</Text>
						</View>
					</View>

					{/* touchables */}
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							style={{
								width: 184,
								height: 36,
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: COLORS.primary,
								borderRadius: 10,
								marginHorizontal: SIZES.padding / 2,
							}}
							onPress={toggleModal}
						>
							{/* edit profile modal */}
							<EditProfile isModalVisible={isModalVisible} toggleModal={toggleModal} />

							<Text
								style={{
									color: COLORS.white,
								}}
							>
								Edit Profile
							</Text>
						</TouchableOpacity>
						{/*  */}
						<TouchableOpacity
							style={{
								width: 184,
								height: 36,
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "#AD40AF",
								borderRadius: 10,
								marginHorizontal: SIZES.padding / 2,
							}}
						>
							<Text
								style={{
									color: "white",
								}}
							>
								Share Profile
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* scrollable tab view */}
				<View style={{ flex: 1, marginHorizontal: 0, marginTop: 0 }}>
					<TabView
						// this height should change depending on amount of photos
						style={{ height: getHeight * 150 }}
						navigationState={{ index, routes }}
						renderScene={renderScene}
						onIndexChange={setIndex}
						initialLayout={{ width: layout.width }}
						renderTabBar={renderTabBar}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
