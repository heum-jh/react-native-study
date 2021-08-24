import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, Easing, Animated} from 'react-native';
import {useWeatherQuery} from './generated/graphql';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import {useEffect} from 'react';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '360deg'}],
  },
  loadingText: {
    fontSize: 24,
  },
  container: {
    flex: 1,
  },
  halfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    fontSize: 36,
    fontWeight: '200',
  },
});
interface TestProps {
  lat: number;
  lon: number;
}
const Test = (porps: TestProps) => {
  const {data, loading, refetch} = useWeatherQuery({
    variables: {
      lat: porps.lat,
      lon: porps.lon,
    },
  });
  const spinValue = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(spinValue.current, {
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  });
  const rotate = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <LinearGradient colors={['#eeeeee', '#ef53ec']} style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <Animated.View style={{transform: [{rotate}]}}>
          <Icon name="loading" size={36} />
        </Animated.View>
        {/* {loading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <>
            <View style={styles.halfContainer}>
              <Icon name="weather-rainy" size={86} />
              <Text style={styles.temp}>{data?.api.main?.temp}℃</Text>
            </View>
            <View style={styles.halfContainer}>
              {data?.api?.weather?.map(item => {
                return <Text key={item?.id}>{item?.main}</Text>;
              })}
              <Text>LinearGradient</Text>
            </View>
          </>
        )} */}
      </SafeAreaView>
    </LinearGradient>
  );
};
export default Test;
