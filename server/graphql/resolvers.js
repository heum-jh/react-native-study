import {weatherAPI} from './db.js';

const resolvers = {
  Query: {
    api: (_, location) => weatherAPI(location),
  },
};

export default resolvers;
