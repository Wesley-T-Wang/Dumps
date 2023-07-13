import React, { Component } from "react";
import { SafeAreaView, View, Button, Text, TextInput, Image, TouchableOpacity } from "react-native";

import registerPNG from "../../assets/images/login/registration.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			username: "",
			confirm: "",
			typing: false,
		};
		this.onSignUp = this.onSignUp.bind(this);
	}
	onSignUp() {
		const { email, password, username } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
					username,
					email,
				});
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		const styles = {
			inputField: {
				flexDirection: "row",
				borderBottomColor: "#ccc",
				borderBottomWidth: 1,
				paddingBottom: 8,
				marginBottom: 25,
			},
		};
		const { confirm, password, email, typing } = this.state;
		const isMatching = confirm === password;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return (
			<SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
				<View style={{ paddingHorizontal: 25 }}>
					<View style={{ alignItems: "center" }}>
						<Image
							source={registerPNG}
							style={{
								width: 300,
								height: 300,
								resizeMode: "contain",
								transform: [{ rotate: "-5deg" }],
							}}
						/>
						<Text style={{ fontSize: 30, fontWeight: 500, marginBottom: 40 }}>Register</Text>
					</View>

					<View style={styles.inputField}>
						<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />
						<TextInput
							placeholder="Username"
							style={{ flex: 1, paddingVertical: 0 }}
							onChangeText={(username) => {
								this.setState({ username });
							}}
						/>
					</View>
					<View style={styles.inputField}>
						<MaterialIcons
							name="alternate-email"
							size={20}
							color="#666"
							style={{ marginRight: 5 }}
						/>
						<TextInput
							placeholder="Email"
							style={{ flex: 1, paddingVertical: 0 }}
							onChangeText={(email) => {
								this.setState({ email, typing: true });
							}}
							keyboardType="email-address"
						/>
						{typing && !emailRegex.test(email) && (
							<Text style={{ color: "#AD40AF", fontWeight: "700" }}>Invalid email format</Text>
						)}
					</View>
					<View style={styles.inputField}>
						<Ionicons
							name="ios-lock-closed-outline"
							size={20}
							color="#666"
							style={{ marginRight: 5 }}
						/>
						<TextInput
							placeholder="Password"
							style={{ flex: 1, paddingVertical: 0 }}
							onChangeText={(password) => {
								this.setState({ password });
							}}
							keyboardType="password"
							secureTextEntry={true}
						/>
					</View>
					<View style={styles.inputField}>
						<Ionicons
							name="ios-lock-closed-outline"
							size={20}
							color="#666"
							style={{ marginRight: 5 }}
						/>
						<TextInput
							placeholder="Confirm Password"
							style={{ flex: 1, paddingVertical: 0, color: isMatching ? "black" : "#AD40AF" }}
							onChangeText={(confirm) => {
								this.setState({ confirm });
							}}
							keyboardType="password"
							secureTextEntry={true}
						/>
						{isMatching ? null : (
							<Text style={{ color: "#AD40AF", fontWeight: 700 }}>Passwords don't match!</Text>
						)}
					</View>

					<TouchableOpacity
						style={{ backgroundColor: "#AD40AF", padding: 20, borderRadius: 10, marginBottom: 30 }}
						onPress={() => this.onSignUp()}
						title="Sign Up"
					>
						<Text style={{ textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 16 }}>
							Register
						</Text>
					</TouchableOpacity>

					<View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 200 }}>
						<Text>Already registed?</Text>
						<TouchableOpacity>
							<Text style={{ color: "#AD40AF", fontWeight: 700 }}> Login!</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

export default Register;
