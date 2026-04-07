import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Button, StyleSheet, View, useColorScheme } from 'react-native';


  const colorScheme = useColorScheme();

 const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;


const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
  deferredUpdatesInterval: 5000,
  foregroundService: {
    notificationTitle: "Location Active",
    notificationBody: "Monitoring your location in the background",
  },
      });
    }
  }
};

const locPermissionsButton = () => (
  <View style={[styles.container, themeContainerStyle]}>
    <Button onPress={requestPermissions} title="Enable background location" />
  </View>
);



TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
alert("start task manger..");
  if (error) { 
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;

        let speed = locations[0].coords.speed;
        let heading = locations[0].coords.heading;
        let accuracy = locations[0].coords.heading;

        alert(
            `${new Date(Date.now()).toLocaleString()}: ${lat},${long} - Speed ${speed} - Precision ${accuracy} - Heading ${heading} `
        );
    // do something with the locations captured in the background
  }
});

const styles = StyleSheet.create({
   container: {
    flex: 1,
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
});

export default locPermissionsButton;