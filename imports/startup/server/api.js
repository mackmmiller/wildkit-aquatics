import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import SwimmerSchema from '../../api/swimmers/Swimmer.graphql';
import SwimmersResolver from '../../api/swimmers/resolvers';
import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolvers';

// hisssssssssssssssssssssssssssssssssss

const typeDefs = [UsersSchema, SwimmerSchema];
const resolvers = merge(UsersResolvers, SwimmersResolver);
console.log(`Schema: ${typeDefs}`);
console.log(`Resolvers: ${resolvers}`);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
