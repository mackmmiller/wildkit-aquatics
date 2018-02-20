import Practices from './practices';
import Groups from '../groups/groups';

export default {
  Query: {
    practices(obj, args) {
      return Practices.find({}).fetch();
    },
  },
};
