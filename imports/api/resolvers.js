import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';
import {
  Admins,
  Coaches,
  Competitions,
  Groups,
  Guardians,
  Parents,
  Practices,
  Results,
  Swimmers,
  Teams,
} from './db';

const Users = Meteor.users;

export default {
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
    Group(obj, { _id }) {
      return Groups.findOne(_id);
    },
    Guardian(obj, { _id }) {
      return Guardians.findOne(_id);
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
      return Users.findOne(_id);
    },
    Team(obj, { _id }) {
      return Teams.findOne(_id);
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
    allGroups(obj, args) {
      return Groups.find({}).fetch();
    },
    allGuardians(obj, args) {
      return Guardians.find({}).fetch();
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
    allTeams(obj, args) {
      return Teams.find({}).fetch();
    },
    allUsers(obj, args) {
      return Users.find({}).fetch();
    },
  },

  Mutation: {
    // Create //
    createAdmin(obj, args, { userId }) {},
    createCoach(obj, { email }) {
      const userId = Users.findOne({
        emails: [{ address: email, verified: false }],
      });
      const coachId = Coaches.insert({ user: userId._id });
      Users.update({ _id: userId._id }, { $set: { coach: coachId } });
      return Coaches.findOne(coachId);
    },
    createCompetition(obj, {
      name, locationName, address, start, end, additionalInfo,
    }, { userId }) {
      const competitionId = Competitions.insert({
        name,
        locationName,
        address,
        start,
        end,
        additionalInfo,
      });
      return Competitions.findOne(competitionId);
    },
    createGroup(obj, { name }, { userId }) {
      const groupId = Groups.insert({
        name,
      });
      return Groups.findOne(groupId);
    },
    createGuardian(obj, {
      parentId, firstName, lastName, phoneNumber, email, relationship,
    }) {
      const guardianId = Guardians.insert({
        parentId,
        firstName,
        lastName,
        phoneNumber,
        email,
        relationship,
      });
      return Guardians.findOne(guardianId);
    },
    createParent(obj, args, { userId }) {
      const parentId = Parents.insert({
        user: userId,
      });
      Users.update({ _id: userId }, { $set: { parent: parentId } });
      return Parents.findOne(parentId);
    },
    createPractice(obj, { start, end, groupId }, { userId }) {
      const practiceId = Practices.insert({
        start,
        end,
        groupId,
      });
      return Practices.findOne(practiceId);
    },
    // createResult(obj, { userId }){},
    createSwimmer(obj, {
      firstName, lastName, middleName, dateOfBirth,
    }, { userId }) {
      const swimmerId = Swimmers.insert({
        firstName,
        lastName,
        middleName,
        dateOfBirth,
        parent: userId,
      });
      return Swimmers.findOne(swimmerId);
    },
    createTeam(obj, { name, shortName }) {
      const teamId = Teams.insert({ name, shortName });
      return Teams.findOne(teamId);
    },

    updateAdmin(obj, args, context) {},
    updateCoach(obj, {
      coachId, title, bio, groupId,
    }, { userId }) {
      console.log('Updating Coach...');
      Coaches.update(coachId, { $set: { title, bio, groupId } });
      return Coaches.findOne(coachId);
    },
    updateCompetition(obj, args, context) {},
    registerSwimmers(obj, { competitionId, swimmerIds }) {
      Competitions.update(competitionId, {
        $set: { swimmers: swimmerIds },
      });
      swimmerIds.forEach(s => Swimmers.update(s, { $push: { competitions: competitionId } }));
      return Competitions.findOne(competitionId);
    },
    updateGroup(obj, args, context) {},
    updateGuardian(obj, args, context) {},
    updateParent(obj, args, context) {},
    updatePractice(obj, args, context) {},
    // updateResult(obj, args, context) {},
    updateSwimmer(obj, {
      swimmerId, firstName, lastName, middleName, dateOfBirth, group, gender,
    }, context) {
      Swimmers.update(swimmerId, {
        $set: {
          firstName, lastName, middleName, dateOfBirth, group, gender,
        },
      });
      return Swimmers.findOne(swimmerId);
    },
    updateTeam(obj, {
      teamId, name, shortName, competitions, practices,
    }) {
      Teams.update(teamId, {
        $set: {
          name, shortName, competitions, practices,
        },
      });
      return Teams.findOne(teamId);
    },

    deleteAdmin(obj, { adminId }, context) {
      Admins.remove(adminId, (e) => {
        if (e) {
          console.log(e);
        }
      });
      return adminId;
    },
    deleteCoach(obj, { coachId }, context) {
      Coaches.remove(coachId, (e) => {
        if (e) {
          console.log(e);
        }
      });
      return coachId;
    },
    deleteCompetition(obj, { competitionId }, context) {
      Competitions.remove(competitionId, (e) => {
        if (e) {
          console.log(e);
        }
      });
      return competitionId;
    },
    deleteGroup(obj, { groupId }, context) {
      Groups.remove(groupId, (e) => {
        if (e) {
          console.log(e);
        }
      });
      return groupId;
    },
    deleteGuardian(obj, { guardianId }, context) {
      Guardians.remove(guardianId, (e) => {
        if (e) {
          console.log(e);
        }
      });
    },
    deleteParent(obj, { parentId }, context) {
      Parents.remove(parentId, (e) => {
        if (e) {
          console.log(e);
        }
      });
      return parentId;
    },
    deletePractice(obj, { practiceId }, context) {
      Practices.remove(practiceId, (e) => {
        if (e) {
          console.log(e);
        }
      });
      return practiceId;
    },
    deleteResult(obj, { resultId }, context) {
      Results.remove(resultId, (e) => {
        if (e) {
          console.log(e);
        }
      });
      return resultId;
    },
    deleteSwimmer(obj, { swimmerId }, context) {
      Swimmers.remove(swimmerId, (e) => {
        if (e) {
          console.log(e);
        }
      });
      return swimmerId;
    },
    deleteTeam(obj, { swimmerId }) {
      Teams.remove(teamId, (e) => {
        if (e) console.log(e);
      });
      return teamId;
    },
    deleteUser(obj, { userId }, context) {
      Users.remove(userId, (e) => {
        if (e) {
          console.log(e);
        }
      });
    },
  },

  // Custom Resolvers //
  Admin: {
    user: admin => Users.findOne({ admin: admin._id }),
  },
  Coach: {
    user: coach => Users.findOne({ coach: coach._id }),
    groups: coach => Groups.find({ _id: { $in: coach.groupId } }).fetch(),
  },
  Competition: {
    swimmers: competition => Swimmers.find({ _id: { $in: competition.swimmers } }).fetch(),
  },
  Group: {
    // Passing in an array... Need to remap data? You've seen this before.
    coaches: group => Coaches.find({ groupId: group._id }).fetch(),
    practices: group => Practices.find({ groupId: group._id }).fetch(),
    swimmers: group => Swimmers.find({ group: group.name }).fetch(),
  },
  Guardian: {},
  Parent: {
    user: parent => Users.findOne({ parent: parent._id }),
    swimmers: parent => Swimmers.find({ parent: parent.user }).fetch(),
    guardians: parent => Guardians.find({ parentId: parent._id }).fetch(),
  },
  Practice: {
    group: practice => Groups.findOne(practice.groupId),
    // event: practice => Events.findOne(practice.eventId),
  },
  Result: {},
  Swimmer: {
    group: swimmer => Groups.findOne({ name: swimmer.group }),
    competitions: swimmer => Competitions.find({ _id: { $in: swimmer.competitions } }).fetch(),
  },
  Team: {},
  User: {
    email: user => user.emails[0].address,
    firstName: user => user.firstName,
    lastName: user => user.lastName,
    userType: user => user.userType,
    parent: user => Parents.findOne(user.parent),
    coach: user => Coaches.findOne(user.coach),
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return moment(value).toDate(); // value from the client
    },
    serialize(value) {
      return moment(value).toDate(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
};
