import Groups from './groups';
import Coaches from '../coaches/coaches';
import Swimmers from '../swimmers/swimmers';

export default {
  Query: {
    groups(obj, args) {
      return Groups.find({}).fetch();
    },
  },
};
