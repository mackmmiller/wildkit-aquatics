import Competitions from './competitions';

export default {
  Query: {
    competitions(obj, args) {
      return Competitions.find({}).fetch();
    },
  },
};
