
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
    setLocation({
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
    // Convert the raw timestamp (ms) to a readable string
    date: new Date(loc.timestamp).toLocaleTimeString(), 
  });
};

   return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>Color scheme: {colorScheme}</Text>
      <Text style={[styles.text, themeTextStyle]}> THIS APP HAS THEMES </Text>
   <View style = {styles.container}>

          <Link href="/(tabs)/PermissionButton" asChild>
          <Pressable style={[styles.container2, themeContainerStyle]}>
  <View>
  <Text style={[styles.text, themeTextStyle]}>
    Location</Text>
    
  </View>
  </Pressable>
  </Link>
      <View style= {[styles.container2, themeContainerStyle]}>
      <Pressable onPress={handleGetLocation} style={styles.container2}>
        <Text style={[styles.text, themeTextStyle]}> Get Current Location
        </Text>
  </Pressable>

     
      {location && (
        <Text style={[styles.text, themeTextStyle]}>
          Lat: {location.latitude} | Lon: {location.longitude}
        </Text>
      )}
  </View>
  </View>
      <StatusBar />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    flexDirection: 'column',
    padding: 2.5, 
    justifyContent: 'center',
  },
    container2: 
    {
      flex: 1,
    flexDirection: 'column',
    padding: 2.5, 
   
    justifyContent: 'flex-end',
  },
    row: {
    flexDirection: 'row',
    padding: 0,
    justifyContent: 'center',
  },
  text: {
   color: '#242c40',
   fontSize: 30,
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
      marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#242c40',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    color: '#242c40',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',

  },
  darkThemeText: {
    color: '#d0d0c0',
       marginTop: 16,
    paddingVertical: 0,
    borderWidth: 4,
    borderColor: '#d0d0c0',
    borderRadius: 6,
    backgroundColor: '#4c515f',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
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
  bottom: {
  justifyContent: 'flex-end',
}
  
});