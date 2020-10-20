import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView,SafeAreaView } from 'react-native';
import ScrollViewScreen from "./components/ScrollViewScreen";
import CarFlatlListScreen from "./components/CarFlatlListScreen";
import UserListScreen from "./components/UserListScreen";

export default function App_uden_ekstra() {
  return (
    <SafeAreaView  style={styles.container}>

            <ScrollViewScreen/>
            <CarFlatlListScreen/>
            <UserListScreen/>
            <StatusBar style="auto" />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding:20,
      marginTop:40,
  },
});
