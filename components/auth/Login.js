import React, { Component } from "react";
import { SafeAreaView, View, Button, Text, TextInput, Image, TouchableOpacity } from "react-native";

import loginPNG from "../../assets/images/login/login.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
		this.onSignIn = this.onSignIn.bind(this);
	}
	onSignIn() {
		const { email, password } = this.state;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
				<View style={{ paddingHorizontal: 25 }}>
					<View style={{ alignItems: "center" }}>
						<Image
							source={loginPNG}
							style={{
								width: 300,
								height: 300,
								resizeMode: "contain",
								transform: [{ rotate: "-5deg" }],
							}}
						/>
						<Text style={{ fontSize: 30, fontWeight: 500, marginBottom: 40 }}>Login</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderBottomColor: "#ccc",
							borderBottomWidth: 1,
							paddingBottom: 8,
							marginBottom: 25,
						}}
					>
						<MaterialIcons
							name="alternate-email"
							size={20}
							color="#666"
							style={{ marginRight: 5 }}
						/>
						<TextInput
							placeholder="Email"
							style={{ flex: 1, paddingVertical: 0 }}
							keyboardType="email-address"
							onChangeText={(email) => this.setState({ email })}
						/>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderBottomColor: "#ccc",
							borderBottomWidth: 1,
							paddingBottom: 8,
							marginBottom: 25,
						}}
					>
						<Ionicons
							name="ios-lock-closed-outline"
							size={20}
							color="#666"
							style={{ marginRight: 5 }}
						/>
						<TextInput
							placeholder="Password"
							style={{ flex: 1, paddingVertical: 0 }}
							secureTextEntry={true}
							onChangeText={(password) => this.setState({ password })}
						/>
						<TouchableOpacity onPress={() => {}}>
							{/* can nav to some forgot screen */}
							<Text style={{ color: "#AD40AF", fontWeight: "500" }}>Forgot password?</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						style={{ backgroundColor: "#AD40AF", padding: 20, borderRadius: 10, marginBottom: 30 }}
						onPress={() => this.onSignIn()}
						title="Sign In"
					>
						<Text style={{ textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 16 }}>
							Login
						</Text>
					</TouchableOpacity>

					<View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 200 }}>
						<Text>New to Dumps?</Text>
						<TouchableOpacity>
							<Text style={{ color: "#AD40AF", fontWeight: 700 }}> Register!</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

export default Login;
