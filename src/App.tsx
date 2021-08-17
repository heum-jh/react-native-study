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
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Test from './test';
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});
interface ILocation {
  latitude: number;
  longitude: number;
}
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#fdf6aa',
    flex: 1,
  },
});

export default App;

function Root() {
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
    <>
      <SafeAreaView style={styles.backgroundStyle}>
        <StatusBar />
        {/* <Loading /> */}
        <View>
          {location ? (
            <>
              <Text>{location?.latitude}</Text>
              <Text>{location?.longitude}</Text>
              <Test />
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
