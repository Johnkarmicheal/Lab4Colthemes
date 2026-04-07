
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

import * as Location from 'expo-location';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars




export default function HomeScreen() {

   
   const colorScheme = useColorScheme();
  const [location, setLocation] = useState<any>(null);

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
const handleGetLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert("Permission Denied", "Allow location access to use this feature.");
    return;
  }

  const loc = await Location.getCurrentPositionAsync({});
  setLocation(loc.coords);
};

   return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>Color scheme: {colorScheme}</Text>
      <Text style={[styles.text, themeTextStyle]}> THIS APP HAS THEMES </Text>
   <View style = {styles.header}>

          <Link href="../locPermissionsButton" asChild>
          <Pressable style={[styles.container, themeContainerStyle]}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text style={[styles.text, themeTextStyle]}>
    Location</Text>
    
  </View>
  </Pressable>
  </Link>

      <Pressable onPress={handleGetLocation} style={styles.container}>
        <Text style={[styles.text, themeTextStyle]}>
          Get Current Location
        </Text>
  </Pressable>

     
      {location && (
        <Text style={[styles.text, themeTextStyle]}>
          Lat: {location.latitude} | Lon: {location.longitude}
        </Text>
      )}
  </View>
      <StatusBar />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  header: {
    padding: 40,
      flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
});