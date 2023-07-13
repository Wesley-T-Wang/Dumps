import React from "react";
import { Text, SafeAreaView, View, Button, TouchableOpacity } from "react-native";

export default function Landing({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
			<View style={{ paddingHorizontal: 25 }}>
				<View style={{ alignItems: "center", marginBottom: 20 }}>
					<Text style={{ fontSize: 45 }}>Dumps</Text>
				</View>
				<TouchableOpacity
					style={{ backgroundColor: "#AD40AF", padding: 20, borderRadius: 10, marginBottom: 30 }}
					onPress={() => navigation.navigate("Register")}
					title="Register"
				>
					<Text style={{ textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 20 }}>
						Register
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ backgroundColor: "#AD40AF", padding: 20, borderRadius: 10, marginBottom: 30 }}
					onPress={() => navigation.navigate("Login")}
					title="Login"
				>
					<Text style={{ textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 20 }}>
						Login
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
