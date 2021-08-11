import {weatherAPI} from './db.js';

const resolvers = {
  Query: {
    api: () => weatherAPI(),
  },
};

export default resolvers;
