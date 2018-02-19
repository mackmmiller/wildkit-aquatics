import Swimmers from './swimmers';

export default {
  Query: {
    swimmers(obj, args) {
      return Swimmers.find({}).fetch();
    },
  },

  Mutation: {
    newSwimmer(obj, {
      firstName, middleInitial, lastName, DOB,
    }, { userId }) {
      const swimmerId = Swimmers.insert({
        firstName,
        middleInitial,
        lastName,
        DOB,
        guardianAccount: userId,
      });
      return Swimmers.findOne(swimmerId);
    },
  },
};
