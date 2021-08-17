import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {Text} from 'react-native';
const GET_NAME = gql`
  query api {
    api {
      name
    }
  }
`;
const Test = () => {
  const {loading, error, data} = useQuery(GET_NAME);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error : {error}</Text>;
  }
  return <Text>Hi {data.api.name}</Text>;
};
export default Test;
