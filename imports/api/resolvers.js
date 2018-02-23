import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';
import {
  Admins,
  Coaches,
  Competitions,
  Events,
  Groups,
  Parents,
  Practices,
  Results,
  Swimmers,
} from './db';

export default {
  // Queries //
  Query: {
    Admin(obj, { _id }) {
      return Admins.findOne(_id);
    },
    Coach(obj, { _id }) {
      return Coaches.findOne(_id);
    },
    Competition(obj, { _id }) {
      return Competitions.findOne(_id);
    },
    Event(obj, { _id }) {
      return Events.findOne(_id);
    },
    Group(obj, { _id }) {
      return Groups.findOne(_id);
    },
    Parent(obj, { _id }) {
      return Parents.findOne(_id);
    },
    Practice(obj, { _id }) {
      return Practices.findOne(_id);
    },
    Result(obj, { _id }) {
      return Results.findOne(_id);
    },
    Swimmer(obj, { _id }) {
      return Swimmers.findOne(_id);
    },
    User(obj, { _id }) {
      return Meteor.users.findOne(_id);
    },
    user(obj, args, { user }) {
      return user || {};
    },

    allAdmins(obj, args) {
      return Admins.find({}).fetch();
    },
    allCoaches(obj, args) {
      return Coaches.find({}).fetch();
    },
    allCompetitions(obj, args) {
      return Competitions.find({}).fetch();
    },
    allEvents(obj, args) {
      return Events.find({}).fetch();
    },
    allGroups(obj, args) {
      return Groups.find({}).fetch();
    },
    allParents(obj, args) {
      return Parents.find({}).fetch();
    },
    allPractices(obj, args) {
      return Practices.find({}).fetch();
    },
    allResults(obj, args) {
      return Results.find({}).fetch();
    },
    allSwimmers(obj, args) {
      return Swimmers.find({}).fetch();
    },
    allUsers(obj, args) {
      return Meteor.users.find({}).fetch();
    },
  },

  // Mutations //
  Mutation: {
    createAdmin(obj, args, { userId }) {},
    createCoach(obj, args, { userId }) {},
    // createCompetition(obj, { userId }){},
    createEvent(obj, { start, end, eventType }, { userId }) {
      console.log('Creating Event');
      const eventId = Events.insert({
        start,
        end,
        eventType,
      });
      console.log(Events.findOne(eventId));
      return Events.findOne(eventId);
    },
    createGroup(obj, { name }, { userId }) {
      const groupId = Groups.insert({
        name,
      });
      return Groups.findOne(groupId);
    },
    createParent(obj, args, { userId }) {
      const parentId = Parents.insert({
        user: userId,
      });
      Meteor.users.update({ _id: userId }, { $set: { parent: parentId } });
      return Parents.findOne(parentId);
    },
    createPractice(obj, { eventId, groupId }, { userId }) {
      const practiceId = Practices.insert({
        eventId,
        groupId,
      });
      return Practices.findOne(practiceId);
    },
    // createResult(obj, { userId }){},
    // createSwimmer(obj, { userId }){},
  },

  // Custom Resolvers //
  Admin: {},
  Coach: {},
  Competition: {},
  Event: {},
  // Group: {
  //   // Passing in an array... Need to remap data? You've seen this before.
  //   coaches: group => Coaches.find({})
  // },
  Parent: {},
  Practice: {
    group: practice => Groups.findOne(practice.groupId),
    event: practice => Events.findOne(practice.eventId),
  },
  Result: {},
  Swimmer: {},
  User: {
    email: user => user.emails[0].address,
    firstName: user => user.firstName,
    lastName: user => user.lastName,
    userType: user => user.userType,
    parent: user => Parents.findOne(user.parent),
  },
};

// Scalars //
const dateMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return moment(value).toDate();
    },
    serialize(value) {
      return moment(value).format('x');
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
};
