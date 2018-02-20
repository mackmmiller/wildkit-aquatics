import Directors from './directors';

export default {
  Query: {
    directors(obj, args) {
      return Directors.find({}).fetch();
    },
  },
};
