import Swimmers from '../swimmers/swimmers';

export default {
  Query: {
    user(obj, args, { user }) {
      return user || {};
    },
  },

  User: {
    email: user => user.emails[0].address,
    userSwimmers: user => Swimmers.find({ guardianAccount: user._id }).fetch(),
  },
};
