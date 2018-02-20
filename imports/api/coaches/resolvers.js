import Coaches from './coaches';

export default {
  Query: {
    coaches(obj, args) {
      return Coaches.find({}).fetch();
    },
  },

  Mutation: {
    newCoach(obj, { firstName, lastName, title }) {
      const coachId = Coaches.insert({
        firstName,
        lastName,
        title,
      });
      return Coaches.findOne(coachId);
    },
  },
};
