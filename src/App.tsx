import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const API_KEY = '47b24d4635cea692830a72a890acc17b';

interface ILocation {
  latitude: number;
  longitude: number;
}
const App = () => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  useLayoutEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);
  useEffect(() => {
    const _watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        Alert.alert(`Error Code : ${error.code}`, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, []);
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar />
      {/* <Loading /> */}
      <View>
        {location ? (
          <>
            <Text>{location?.latitude}</Text>
            <Text>{location?.longitude}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#fdf6aa',
    flex: 1,
  },
});

export default App;
