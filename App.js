import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
console.reportErrorsAsExceptions = false; // copy paste this line in your App.js 

import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk))

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA36npnEQZ_JvDACB7XSIxkUa1N01MUk6k",
  authDomain: "dumps-9e6e7.firebaseapp.com",
  projectId: "dumps-9e6e7",
  storageBucket: "dumps-9e6e7.appspot.com",
  messagingSenderId: "462994302983",
  appId: "1:462994302983:web:2f410425de77b2e902e2a2",
  measurementId: "G-FQ5E0KY533"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'

const Stack = createStackNavigator();


import React, { Component } from 'react'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>
            Loading
          </Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      )

    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={AddScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App