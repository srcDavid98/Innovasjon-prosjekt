import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView,SafeAreaView } from 'react-native';
import UserListScreen from "./components/UserListScreen";
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import UserProfilScreen from "./components/Api/UserProfilScreen";
import SignUpForm from './components/SignUp';
import fireabse from 'firebase';
import LoginForm from './components/LogIn';
import Maps from './components/Local/Maps';



//Stacknavigator der tillater at layere de forskjellige views for enkel og funksjonell navigering
const stackNavigator2 = createStackNavigator({
    Maps : {screen: Maps},
    LogIn: {screen: LoginForm},
    SignUp: {screen: SignUpForm},
    UserList: {screen: UserListScreen},
    UserProfile: {screen: UserProfilScreen}
}
);

//Håndterer vår app state og linker til top-level navigator.
const AppContainer = createAppContainer(stackNavigator2);

//Konfigurer Firebase connection
const firebaseConfig = {
    apiKey: "AIzaSyBi5S8K2kd0MzaEDEPS2SD8Q35dMuk316U",
    authDomain: "prosjektprosjekt-b3958.firebaseapp.com",
    databaseURL: "https://prosjektprosjekt-b3958.firebaseio.com",
    projectId: "prosjektprosjekt-b3958",
    storageBucket: "prosjektprosjekt-b3958.appspot.com",
    messagingSenderId: "758535528267",
    appId: "1:758535528267:web:230cdc1571ffa9cc0112ce"
  };

  /*Sjekker at det ikke allerede eksisterer en firebase connection. 
  If(0) så kører vi, if(!0) kører vi ikke. For å unngå overflow av connections & bandwith der kan føre til kræsj
  jf. DIS fejl*/
if (fireabse.apps.length === 0){
    fireabse.initializeApp(firebaseConfig);
}

export default class App extends React.Component {

    //Renderer Appcointener der inneholder vår stacknavigator
    render() {
      return <AppContainer />;
    }
  }