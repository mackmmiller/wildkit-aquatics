import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
// import merge from 'lodash/merge';

// import CoachSchema from '../../api/coaches/Coach.graphql';
// import CoachesResolver from '../../api/coaches/resolvers';
// import CompetitionSchema from '../../api/competitions/Competition.graphql';
// import CompetitionsResolvers from '../../api/competitions/competitions';
// import DirectorSchema from '../../api/directors/Director.graphql';
// import DirectorsResolvers from '../../api/directors/resolvers';
// import GroupSchema from '../../api/groups/Group.graphql';
// import GroupResolvers from '../../api/groups/resolvers';
// import PracticeSchema from '../../api/practices/Practice.graphql';
// import PracticesResolvers from '../../api/practices/resolvers';
// import SwimmerSchema from '../../api/swimmers/Swimmer.graphql';
// import SwimmersResolver from '../../api/swimmers/resolvers';
// import UsersSchema from '../../api/users/User.graphql';
// import UsersResolvers from '../../api/users/resolvers';

// // hissssssssssssssssssssssssssss

// const typeDefs = [
//   UsersSchema,
//   SwimmerSchema,
//   CoachSchema,
//   GroupSchema,
//   PracticeSchema,
//   DirectorSchema,
// ];

// const resolvers = merge(
//   UsersResolvers,
//   SwimmersResolver,
//   CoachesResolver,
//   GroupResolvers,
//   PracticesResolvers,
//   DirectorsResolvers,
// );

import typeDefs from '../../api/Schema.graphql';
import resolvers from '../../api/resolvers';

// console.log(`
// Schema:
// ${typeDefs}

// Resolvers:
// ${resolvers}
// `);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
